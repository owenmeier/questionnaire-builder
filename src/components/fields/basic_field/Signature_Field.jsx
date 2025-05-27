import React, { useRef } from "react"
import SignatureCanvas from "react-signature-canvas"

const SignatureField = ({ field, label, onUpdate, onDelete, isPreview }) => {
    const sigPadRef = useRef(null)
    const locked = !!field.locked;


    // Only save signature when user confirms
    const handleConfirm = () => {
        if (sigPadRef.current) {
            const dataUrl = sigPadRef.current.getTrimmedCanvas().toDataURL("image/png")
            onUpdate("value", dataUrl)
            onUpdate("locked", true)
        }
    }

    const handleClear = () => {
        if (sigPadRef.current) {
            sigPadRef.current.clear()
            onUpdate("value", "")
            onUpdate("locked", false)
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
                    field.value ? (
                        <img src={field.value} alt="Signature" className="border border-gray-400 rounded h-24 bg-gray-50" />
                    ) : (
                        <div className="border border-gray-400 rounded h-24 bg-gray-50 flex items-center justify-center text-gray-400">
                            No signature captured.
                        </div>
                    )
                ) : (
                    <div>
                        <SignatureCanvas
                            ref={sigPadRef}
                            penColor="black"
                            canvasProps={{ width: 400, height: 96, className: "border border-gray-400 rounded bg-gray-50" }}
                            readOnly={locked}
                        />
                        <div className="flex mt-2 space-x-2">
                            <button onClick={handleClear} className="px-2 py-1 bg-gray-200 rounded text-sm" disabled={locked}>Clear</button>
                            <button onClick={handleConfirm} className="px-2 py-1 bg-blue-500 text-white rounded text-sm" disabled={locked}>Confirm Signature</button>
                        </div>
                        {locked && (
                            <div className="text-green-600 mt-2 text-sm">Signature locked. Clear to re-sign.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SignatureField
