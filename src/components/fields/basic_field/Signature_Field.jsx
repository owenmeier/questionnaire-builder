import React, { useRef } from "react"
import SignatureCanvas from "react-signature-canvas"

const SignatureField = ({ field, label, onUpdate, onDelete, isPreview }) => {
    const sigPadRef = useRef(null)
    const fileInputRef = useRef(null)
    const locked = !!field.locked;



const handleClear = () => {
    // Remove the value and unlock first
    onUpdate("value", "");
    onUpdate("locked", false);

    // Reset the file input (if present)
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }

    // Clear the signature pad (if present)
    if (sigPadRef.current && sigPadRef.current.clear) {
        sigPadRef.current.clear();
    }
}

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
                {isPreview ? (
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <label className="block text-sm font-medium mb-1 sm:mb-0">Upload existing signature (PNG):</label>
                            <label className={`inline-block px-4 py-2 bg-blue-500 text-white rounded shadow cursor-pointer transition hover:bg-blue-600 ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                style={{ pointerEvents: locked ? 'none' : 'auto' }}>
                                Choose File
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png"
                                    className="hidden"
                                    onChange={e => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new window.FileReader();
                                            reader.onload = (ev) => {
                                                onUpdate("value", ev.target.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    disabled={locked}
                                />
                            </label>
                        </div>
                        <div className="mb-2 text-sm text-gray-700 font-medium">Or create a new signature below:</div>
                        {field.value ? (
                            <img
                                src={field.value}
                                alt="Signature"
                                className="border border-gray-400 rounded h-24 bg-gray-50"
                                style={{ cursor: 'pointer' }}
                                onError={e => {
                                    // If the image fails to load, clear the value
                                    onUpdate("value", "");
                                }}
                            />
                        ) : (
                            <SignatureCanvas
                                ref={sigPadRef}
                                penColor="black"
                                canvasProps={{ width: 400, height: 96, className: "border border-gray-400 rounded bg-gray-50" }}
                                readOnly={locked}
                            />
                        )}
                        <div className="flex mt-2 space-x-2">
                            <button
                                type="button"
                                onClick={() => {
                                    onUpdate("value", "");
                                    onUpdate("locked", false);
                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                    if (sigPadRef.current && sigPadRef.current.clear) sigPadRef.current.clear();
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition"
                                style={{ cursor: 'pointer', minWidth: 80 }}
                                tabIndex={0}
                            >
                                Clear
                            </button>
                        </div>
                        {locked && (
                            <div className="text-green-600 mt-2 text-sm">Signature locked. Clear to re-sign.</div>
                        )}
                    </div>
                ) : (
                    <div className="border border-gray-400 rounded h-24 bg-gray-50 flex items-center justify-center text-gray-400">
                        Signature pad placeholder (editor only)
                    </div>
                )}
            </div>
        </div>
    )
}

export default SignatureField
