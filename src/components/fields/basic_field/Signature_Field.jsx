import React from "react"

const SignatureField = ({ field, label, onUpdate, onDelete, isPreview }) => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <div className="flex justify-between items-center mb-2">
                <label className="font-bold text-lg">{label || "Signature Field"}</label>
                {!isPreview && (
                    <button onClick={onDelete} className="text-red-500 ml-2">Delete</button>
                )}
            </div>
            <div className="mb-2">
                <span className="block mb-1 font-medium">{field.question || "Please sign below:"}</span>
                {/* Placeholder for signature input. In a real app, use a signature pad library. */}
                <div className="border border-gray-400 rounded h-24 bg-gray-50 flex items-center justify-center text-gray-400">
                    {isPreview ? "[Signature Pad Here]" : "Signature will be captured here."}
                </div>
            </div>
        </div>
    )
}

export default SignatureField
