import React from "react"
import { v4 as uuidv4 } from 'uuid';
import { TRASHCAN_ICON } from "../../../assets/icons";

const InputField = ({ field, onUpdate, onDelete, isPreview }) => {
    const uniqueId = field.id || uuidv4();

    return (
        <div className="p-4 bg-white shadow rounded-lg">
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
                {/*Delete btn - Available only in EDIT MODE*/}
                {!isPreview && (
                    <button
                        onClick={onDelete}
                        className="ml-2 px-3 py-1 text-black/70 hover:text-black"
                    >
                        <TRASHCAN_ICON />
                    </button>
                )}
            </div>
            {/* Answer input - Available only in PREVIEW MODE */}
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
