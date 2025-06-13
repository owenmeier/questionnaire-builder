import React, { useMemo } from "react";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "survey-core/survey-core.min.css";
import { v4 as uuidv4 } from "uuid";
import { initializeField } from "../utils/initializedFieldOptions";
import fieldTypes from "./fields/fieldTypes-config";

// Utility: Map your formData to SurveyJS JSON

function formDataToSurveyJson(formData) {
  const typeMap = {
    input: "text",
    radio: "radiogroup",
    check: "checkbox",
    selection: "dropdown",
    signature: "signaturepad",
  };

  const elements = formData
    .map((field) => {
      const type = typeMap[field.fieldType];
      if (!type) return null;
      const base = {
        type,
        name: field.id,
        title:
          field.question ||
          (type === "signaturepad"
            ? "Please sign below:"
            : "Untitled Question"),
        isRequired: !!field.required,
        description: field.description || undefined,
      };
      if (["radiogroup", "checkbox", "dropdown"].includes(type)) {
        return {
          ...base,
          choices: (field.options || []).map((opt) => opt.value),
        };
      }
      return base;
    })
    .filter(Boolean);

  return {
    title:
      // Use a div to wrap the title in SurveyJS preview mode for custom width
      // SurveyJS expects a string, but we can use CSS to target the title
      "My Questionnaire",
    pages: [{ elements }],
  };
}

// Now addField and fieldTypes are passed as props from App.jsx
const FormBuilder = ({
  formData,
  setFormData,
  isPreview,
  setIsPreview,
  addField,
  fieldTypes,
}) => {
  // Migration: Ensure all fields have a unique, non-empty, and non-duplicate id (for legacy/imported data)
  const migratedRef = React.useRef(false);
  // Check for missing or empty IDs
  const hasMissingId = formData.some(
    (field) =>
      !field.id || typeof field.id !== "string" || field.id.trim() === ""
  );
  // Check for duplicate IDs
  const idCounts = formData.reduce((acc, field) => {
    if (field.id) acc[field.id] = (acc[field.id] || 0) + 1;
    return acc;
  }, {});
  const hasDuplicateId = Object.values(idCounts).some((count) => count > 1);
  const needsMigration = hasMissingId || hasDuplicateId;

  React.useEffect(() => {
    if (migratedRef.current) return;
    if (needsMigration) {
      // Assign new UUIDs to missing/empty IDs and to duplicates
      const seen = new Set();
      const updatedFields = formData.map((field) => {
        let newId = field.id;
        if (
          !newId ||
          typeof newId !== "string" ||
          newId.trim() === "" ||
          seen.has(newId)
        ) {
          newId = uuidv4();
        }
        seen.add(newId);
        return { ...field, id: newId };
      });
      setFormData(updatedFields);
      migratedRef.current = true;
    }
  }, [needsMigration, formData, setFormData]);

  // Memoize survey JSON for performance (must be before any early return)
  const surveyJson = useMemo(() => formDataToSurveyJson(formData), [formData]);

  // Block rendering until migration is done
  if (needsMigration) return null;
  // Update field in formData
  const updateField = (id, key, value) => {
    setFormData((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

  // Delete field from formData
  const deleteField = (id) => {
    setFormData((prev) => prev.filter((field) => field.id !== id));
  };

  // (Removed duplicate surveyJson declaration)

  return (
    <div className="formBuilderMain pt-8 px-4 pb-20 flex flex-col items-center">
      {/* MAIN FORM COMPONENT: Custom builder in edit mode, SurveyJS in preview mode */}
      {isPreview ? (
        <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col items-center">
          <Survey model={new Model(surveyJson)} />
        </div>
      ) : (
        <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col items-center">
          {formData.map((field) => {
            const FieldComponent = fieldTypes[field.fieldType]?.component;
            return (
              FieldComponent && (
                <div key={field.id} className="mb-4 w-full">
                  <FieldComponent
                    field={field}
                    label={fieldTypes[field.fieldType]?.label}
                    onUpdate={(key, value) => updateField(field.id, key, value)}
                    onDelete={() => deleteField(field.id)}
                    isPreview={isPreview}
                    formData={formData}
                  />
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
