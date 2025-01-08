import React from "react";
import { v4 as uuidv4 } from "uuid"; 

const SelectionField = ({ field, onUpdate, onDelete, isPreview }) => {
    const addOption = () => {
        const newOption = { id: uuidv4(), value: "" }; 
        onUpdate("options", [...field.options, newOption]);
    };

    const updateOption = (id, value) => {
        const updatedOptions = field.options.map((option) =>
            option.id === id ? { ...option, value } : option
        );
        onUpdate("options", updatedOptions);

        if (field.selected === id) {
            onUpdate("selected", id);
        }
    };

    const removeOption = (id) => {
        const updatedOptions = field.options.filter((option) => option.id !== id);
        onUpdate("options", updatedOptions);
        if (field.selected === id) {
            onUpdate("selected", "");
        }
    };

    const handleSelectionChange = (e) => {
        const selectedId = e.target.value;
        onUpdate("selected", selectedId || ""); 
    };

    return (
        <div className="p-4 border rounded">
            <div className="flex justify-between mb-2">
                <input
                    type="text"
                    value={field.question}
                    onChange={(e) => onUpdate("question", e.target.value)}
                    placeholder="Enter question"
                    className="px-3 py-2 border rounded w-full"
                    disabled={isPreview} 
                />
                {!isPreview && (
                    <button
                        onClick={onDelete}
                        className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>
                )}
            </div>

            <select
                className="px-3 py-2 border rounded w-full"
                onChange={handleSelectionChange}
                value={field.selected || ""} 
                disabled={!isPreview} 
            >
                <option value="">Select an option</option>
                {field.options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.value}
                    </option>
                ))}
            </select>

            {/* Options Editor - Editable only in EDIT MODE */}
            {!isPreview && (
                <div>
                    {field.options.map((option) => (
                        <div key={option.id} className="flex items-center mt-2">
                            <input
                                type="text"
                                value={option.value}
                                onChange={(e) => updateOption(option.id, e.target.value)}
                                placeholder="Option text"
                                className="px-3 py-2 border rounded w-full"
                            />
                            <button
                                onClick={() => removeOption(option.id)}
                                className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Option Button - Available only in EDIT MODE */}
            {!isPreview && (
                <button
                    onClick={addOption}
                    className="mt-2 px-3 py-1 bg-indigo-500 text-white rounded"
                >
                    Add Option
                </button>
            )}
        </div>
    );
};

export default SelectionField;
