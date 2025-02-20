import React from "react"
import { v4 as uuidv4 } from 'uuid';
import { TRASHCAN_ICON } from "../../../assets/icons";

const InputField = ({ field, label, onUpdate, onDelete, isPreview }) => {
    const uniqueId = field.id || uuidv4();

    return (
        <div className="p-4 bg-white shadow rounded-lg">
            {/*FIELD TITLE BAR */}
            {!isPreview && (
                <div className="flex justify-between items-center mb-2">
                    <div className="text-lg font-bold text-gray-700">
                        {label}
                    </div>
                    <button
                        onClick={onDelete}
                        className="px-2 py-1 text-black/80 hover:text-red-600"
                    >
                        <TRASHCAN_ICON 
                            className="cursor-pointer"
                        />
                    </button>
                </div>
            )}

            {/*FIELD QUESTION BOX */}
            <div className="flex justify-between mb-2">
                <input
                    className="px-3 py-2 w-full border border-black/40 rounded 
                                disabled:border-0 disabled:border-b disabled:rounded-none disabled:text-left disabled:px-2"
                    id={`input-uuid-${uniqueId}`}
                    type="text"
                    value={field.question}
                    onChange={(e) => onUpdate("question", e.target.value)}
                    placeholder="Enter question"
                    disabled={isPreview}
                />
            </div>

            {/*FIELD USER INPUT BOX*/}
            <input
                id={`answer-uuid-${uniqueId}`}
                type="text"
                value={field.answer || ""}
                onChange={(e) => onUpdate("answer", e.target.value)}
                placeholder="Answer here..."
                className="px-3 py-2 w-full border border-black/10 shadow-2xs rounded disabled:bg-black/4"
                disabled={!isPreview}
            />
        </div>
    )
}

export default InputField
