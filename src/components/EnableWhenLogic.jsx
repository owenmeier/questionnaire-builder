import React, { useState, useEffect } from 'react';

const EnableWhenLogic = ({ fieldId, formData, onUpdate }) => {

    const parentField = formData.find((field) => field.id === fieldId);
    const existingLogic = parentField?.enableWhen || { fieldId: "", value: "" };

    const [selectedFieldId, setSelectedFieldId] = useState(existingLogic.fieldId);
    const [selectedValue, setSelectedValue] = useState(existingLogic.value);

    useEffect(() => {
        setSelectedFieldId(existingLogic.fieldId || "");
        setSelectedValue(existingLogic.value || "");
    }, [existingLogic.fieldId, existingLogic.value]);

    const handleFieldSelection = (e) => {
        const newSelectedFieldId = e.target.value;
        setSelectedFieldId(newSelectedFieldId);

        onUpdate("enableWhen", {
            fieldId: newSelectedFieldId,
            value: selectedValue, 
        });
    };

    const handleValueSelection = (e) => {
        const newSelectedValue = e.target.value;
        setSelectedValue(newSelectedValue);
        onUpdate("enableWhen", {
            fieldId: selectedFieldId, 
            value: newSelectedValue,
        });
    };

    return (
        <div className="flex items-center space-x-2">
            <label>Enable when:</label>
            <select
                onChange={handleFieldSelection}
                value={selectedFieldId}
                className="border p-1 rounded"
            >
                <option value="">Select a field</option>
                {formData.map((field) => (
                    <option key={field.id} value={field.id}>
                        {field.question || `Field ${field.id}`}
                    </option>
                ))}
            </select>

            {selectedFieldId && (
                <select
                    onChange={handleValueSelection}
                    value={selectedValue}
                    className="border p-1 rounded"
                >
                    <option value="">Select a value</option>
                    {
                        formData
                            .find((field) => field.id === selectedFieldId)
                            ?.options?.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.value}
                                </option>
                            ))
                    }
                </select>
            )}
        </div>
    );
};

export default EnableWhenLogic;
