import { generateUniqueId, initializeField } from "../utils/initializedFieldOptions";
import fieldTypes from "./fields/fieldTypes-config";
import React, { useState } from "react";
import MobileToolBar from "./MobileToolBar"

const FormBuilder = ({ formData, setFormData, isPreview }) => {


    const togglePreview = () => setIsPreview(!isPreview);

    const addField = (type) => {
        const fieldTemplate = fieldTypes[type]?.defaultProps;
        if (fieldTemplate) {
            const initializedField = initializeField({ ...fieldTemplate, id: generateUniqueId() });
            setFormData([...formData, initializedField]);
        } else {
            alert("Unknown field type");
        }
    };

    const updateField = (id, key, value) => {
        setFormData(
            formData.map((field) =>
                field.id === id ? { ...field, [key]: value } : field
            )
        );
    };

    const deleteField = (id) => {
        setFormData(formData.filter((field) => field.id !== id));
    };

    return (
        <div className="formBuilderMain min-h-screen p-4 mt-32 lg:mt-24">
            {!isPreview && (
                    <MobileToolBar
                        togglePreview={togglePreview}
                        addField={addField}
                        fieldTypes={fieldTypes}
                        formData={formData}
                    /> 
            )
            }

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
                                    onDelete={() => !isPreview && deleteField(field.id)}
                                    isPreview={isPreview}
                                />
                            </div>
                        )
                    );
                })}
            </div>
        </div>
    );
};

export default FormBuilder;
