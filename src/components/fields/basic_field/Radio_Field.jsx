import React from "react";
import { v4 as uuidv4 } from "uuid";
import { PLUSOPTION_ICON, TRASHCAN_ICON, TRASHCANTWO_ICON } from "../../../assets/icons";

const RadioField = ({ field, onUpdate, onDelete, isPreview }) => {
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
        onUpdate("selected", id);
    };

    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <div className="flex justify-between mb-2">
                <input
                    className="px-3 py-2 w-full border border-black/40 rounded 
                                disabled:border-0 disabled:border-b disabled:rounded-none disabled:text-left disabled:px-2"
                    type="text"
                    value={field.question}
                    onChange={(e) => onUpdate("question", e.target.value)}
                    placeholder="Enter question"
                    disabled={isPreview}
                />
                {!isPreview && (
                    <button
                        onClick={onDelete}
                        className="ml-2 px-3 py-1 text-black/70 hover:text-black"
                    >
                        <TRASHCAN_ICON />
                    </button>
                )}
            </div>

            <div>
                {field.options
                    .filter((option) => !isPreview || option.value.trim() !== "")
                    .map((option) => (
                        <div key={option.id} className="flex items-center px-3 py-1 my-1 shadow border border-black/10 rounded-lg">
                            <input
                                id={`option-${option.id}`}
                                type="radio"
                                name={`question-${field.id}`}
                                className="mr-2"
                                checked={field.selected === option.id}
                                onChange={() => handleSelectionChange(option.id)}
                                disabled={!isPreview}
                            />
                            <label htmlFor={`option-${option.id}`} className={`w-full ${isPreview ? "px-3 py-2" : ""}`}>
                                {isPreview ? (
                                    <span>{option.value}</span>
                                ) : (
                                    <input
                                        type="text"
                                        value={option.value}
                                        onChange={(e) => updateOption(option.id, e.target.value)}
                                        placeholder="Option text"
                                        className="px-3 py-2 w-full focus:outline-black/30"
                                    />
                                )}
                            </label>

                            {!isPreview && (
                                <button
                                    onClick={() =>
                                        onUpdate(
                                            "options",
                                            field.options.filter((opt) => opt.id !== option.id)
                                        )
                                    }
                                    className="ml-2 px-3 py-1 text-black/70 hover:text-black"
                                >
                                    <TRASHCANTWO_ICON />
                                </button>
                            )}
                        </div>
                    ))}
            </div>

            {!isPreview && (
                <button
                    onClick={addOption}
                    className="mt-2 px-2 py-1 bg-indigo-500 text-white rounded-lg"
                >
                    <div className="flex items-center">
                        Add Option
                        <PLUSOPTION_ICON className="h-9 w-9 pl-2" />
                    </div>
                </button>
            )}
        </div>
    );
};

export default RadioField;
