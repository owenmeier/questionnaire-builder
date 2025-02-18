import React from "react";
import { v4 as uuidv4 } from "uuid";
import { PLUSOPTION_ICON, TRASHCAN_ICON, TRASHCANTWO_ICON } from "../../../assets/icons";

const SelectionField = ({ field, label, onUpdate, onDelete, isPreview }) => {
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
        <div className="p-4 bg-white shadow rounded-lg">

            {!isPreview && (
                <div className="flex justify-between items-center mb-2">
                    <div className="text-lg font-bold text-gray-700">
                        {label}
                    </div>
                    <button
                        onClick={onDelete}
                        className="px-2 py-1 text-black/80 hover:text-red-600"
                    >
                        <TRASHCAN_ICON />
                    </button>
                </div>
            )}

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
            </div>

            <select
                className="w-full px-4 py-3 shadow border border-black/10 rounded-lg"
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


            {!isPreview && (
                <div>
                    {field.options.map((option) => (
                        <div key={option.id} className="flex items-center px-3 py-1 my-1 shadow border border-black/10 rounded-lg">
                            <input
                                type="text"
                                value={option.value}
                                onChange={(e) => updateOption(option.id, e.target.value)}
                                placeholder="Option text"
                                className="px-3 py-2 w-full focus:outline-black/30"
                            />
                            <button
                                onClick={() => removeOption(option.id)}
                                className="ml-2 px-3 py-1 text-black/70 hover:text-black "
                            >
                                <TRASHCANTWO_ICON />
                            </button>
                        </div>
                    ))}
                </div>
            )}


            {!isPreview && (
                <button
                    onClick={addOption}
                    className="mt-2 px-2 py-0 bg-indigo-500 text-white rounded-lg "
                >
                    <PLUSOPTION_ICON className="h-10 w-10" />
                </button>
            )}
        </div>
    );
};

export default SelectionField;
