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
    title: "My Questionnaire",
    pages: [{ elements }],
  };
}


// Now addField and fieldTypes are passed as props from App.jsx
const FormBuilder = ({ formData, setFormData, isPreview, setIsPreview, addField, fieldTypes }) => {

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

  // Memoize survey JSON for performance
  const surveyJson = useMemo(() => formDataToSurveyJson(formData), [formData]);

  return (
    <div className="formBuilderMain pt-8 px-4 pb-20">
      {/* MAIN FORM COMPONENT: Custom builder in edit mode, SurveyJS in preview mode */}
      {isPreview ? (
        <Survey model={new Model(surveyJson)} />
      ) : (
        <div>
          {formData.map((field) => {
            const FieldComponent = fieldTypes[field.fieldType]?.component;
            return (
              FieldComponent && (
                <div key={field.id} className="mb-4">
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
