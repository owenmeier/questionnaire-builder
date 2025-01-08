import React from "react";
import { v4 as uuidv4 } from "uuid";

const ChoiceField = ({ field, onUpdate, onDelete, isPreview }) => {
    const addOption = () => {
        const newOption = { id: uuidv4(), value: "" };
        onUpdate("options", [...field.options, newOption]);
    };

    const updateOption = (id, value) => {
        const updatedOptions = field.options.map((option) =>
            option.id === id ? { ...option, value } : option
        );
        onUpdate("options", updatedOptions);
    };

    const handleSelectionChange = (id) => {
        if (field.choiceType === "checkbox") {
            const selected = field.selected || [];
            const updatedSelected = selected.includes(id)
                ? selected.filter((selectedId) => selectedId !== id)
                : [...selected, id];
            onUpdate("selected", updatedSelected);
        } else {
            onUpdate("selected", id);
        }
    };

    const handleChoiceTypeChange = (newChoiceType) => {
        const resetSelected = newChoiceType === "checkbox" ? [] : null;
        onUpdate("choiceType", newChoiceType);
        onUpdate("selected", resetSelected);
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

            {!isPreview && (
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">
                        Question Type:
                    </label>
                    <select
                        value={field.choiceType}
                        onChange={(e) => handleChoiceTypeChange(e.target.value)}
                        className="px-3 py-2 border rounded w-full"
                    >
                        <option value="radio">Single Choice (Radio)</option>
                        <option value="checkbox">Multiple Choice (Checkbox)</option>
                    </select>
                </div>
            )}

            <div>
                {/* Filter out options with no text only in PREVIEW MODE*/}
                {field.options
                    .filter((option) => !isPreview || option.value.trim() !== "")
                    .map((option) => (
                        <div
                            key={option.id}
                            className="flex items-center space-x-2 space-y-1"
                        >

                            <input
                                id={`option-${option.id}`}
                                type={field.choiceType}
                                name={`question-${field.id}`}
                                className="mr-2"
                                checked={
                                    field.choiceType === "checkbox"
                                        ? field.selected?.includes(option.id)
                                        : field.selected === option.id
                                }
                                onChange={() => handleSelectionChange(option.id)}
                                disabled={!isPreview}
                            />
                            <label
                                htmlFor={`option-${option.id}`}
                                className={`w-full ${
                                    isPreview ? "px-3 py-2 border rounded" : ""
                                }`}
                            >
                                {/*PREVIEW MODE => Turns into span */}
                                {/*EDIT MODE => Turns into Input for editing */}
                                
                                {isPreview ? (
                                    <span>{option.value}</span>
                                ) : (
                                    <input
                                        type="text"
                                        value={option.value}
                                        onChange={(e) =>
                                            updateOption(option.id, e.target.value)
                                        }
                                        placeholder="Option text"
                                        className="px-3 py-2 border rounded w-full"
                                    />
                                )}
                            </label>

                            {/*Remove Btn - Available only in EDIT MODE */}
                            {!isPreview && (
                                <button
                                    onClick={() =>
                                        onUpdate(
                                            "options",
                                            field.options.filter(
                                                (opt) => opt.id !== option.id
                                            )
                                        )
                                    }
                                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
            </div>

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

export default ChoiceField;
