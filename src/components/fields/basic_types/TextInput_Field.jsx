import React from "react"
import { v4 as uuidv4 } from 'uuid';

const InputField = ({ field, onUpdate, onDelete, isPreview }) => {
    const uniqueId = field.id || uuidv4();

    return (
        <div className="p-4 border rounded">
            <div className="flex justify-between mb-2">
                <input
                    id={`input-uuid-${uniqueId}`}
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
            <input
                id={`answer-uuid-${uniqueId}`}
                type="text"
                value={field.answer || ""}
                onChange={(e) => onUpdate("answer", e.target.value)}
                placeholder="Answer here..."
                className="px-3 py-2 border rounded w-full"
                disabled={!isPreview} 
            />
        </div>
    )
}

export default InputField
