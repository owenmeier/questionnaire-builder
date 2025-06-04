import React, { useMemo } from "react";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "survey-core/survey-core.min.css";
import { v4 as uuidv4 } from "uuid";
import { initializeField } from "../utils/initializedFieldOptions";
import fieldTypes from "./fields/fieldTypes-config";
import MobileToolBar from "./MobileToolBar";

// Utility: Map your formData to SurveyJS JSON
function formDataToSurveyJson(formData) {
  return {
    title: "My Questionnaire",
    pages: [
      {
        elements: formData
          .map((field) => {
            switch (field.fieldType) {
              case "input":
                return {
                  type: "text",
                  name: field.id,
                  title: field.question || "Untitled Question",
                  isRequired: !!field.required,
                };
              case "radio":
                return {
                  type: "radiogroup",
                  name: field.id,
                  title: field.question || "Untitled Question",
                  choices: (field.options || []).map((opt) => opt.value),
                  isRequired: !!field.required,
                };
              case "check":
                return {
                  type: "checkbox",
                  name: field.id,
                  title: field.question || "Untitled Question",
                  choices: (field.options || []).map((opt) => opt.value),
                  isRequired: !!field.required,
                };
              case "selection":
                return {
                  type: "dropdown",
                  name: field.id,
                  title: field.question || "Untitled Question",
                  choices: (field.options || []).map((opt) => opt.value),
                  isRequired: !!field.required,
                };
              case "signature":
                return {
                  type: "signaturepad",
                  name: field.id,
                  title: field.question || "Please sign below:",
                  isRequired: !!field.required,
                };
              default:
                return null;
            }
          })
          .filter(Boolean),
      },
    ],
  };
}

const FormBuilder = ({ formData, setFormData, isPreview, setIsPreview }) => {
  // Add field to formData
  const addField = (type) => {
    const fieldTemplate = fieldTypes[type]?.defaultProps;
    if (fieldTemplate) {
      const initializedField = initializeField({
        ...fieldTemplate,
        id: uuidv4(),
      });
      setFormData((prev) => [...prev, initializedField]);
    } else {
      alert("Unknown field type");
    }
  };

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
      {/* MOBILE TOOL BAR COMPONENT */}
      <MobileToolBar
        addField={addField}
        fieldTypes={fieldTypes}
        formData={formData}
        isPreview={isPreview}
        setIsPreview={setIsPreview}
      />

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
