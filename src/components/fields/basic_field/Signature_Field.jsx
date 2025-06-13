import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignatureField = ({ field, label, onUpdate, onDelete, isPreview }) => {
  const sigPadRef = useRef(null);
  const fileInputRef = useRef(null);
  const locked = !!field.locked;
  const [sigChanged, setSigChanged] = useState(0);

  useEffect(() => {}, []);

  const handleClear = () => {
    onUpdate("value", "");
    onUpdate("locked", false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (sigPadRef.current && sigPadRef.current.clear) sigPadRef.current.clear();
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <label className="font-bold text-lg">
          {label || "Signature Field"}
        </label>
        {!isPreview && (
          <button onClick={onDelete} className="text-red-500 ml-2">
            Delete
          </button>
        )}
      </div>
      <div className="mb-2 flex items-center">
        <span className="block mb-1 font-medium">
          {field.question || "Please sign below:"}
          {isPreview && field.required && (
            <span className="text-red-500 ml-1" title="Required">
              *
            </span>
          )}
        </span>
        {!isPreview && (
          <label className="ml-3 flex items-center text-sm select-none">
            <span className="text-gray-700 mr-2">Required</span>
            <button
              type="button"
              aria-pressed={!!field.required}
              onClick={() => onUpdate("required", !field.required)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                field.required ? "bg-red-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  field.required ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </label>
        )}
      </div>
      {/* Description Field */}
      <div className="flex flex-col">
        {isPreview ? (
          field.description && (
            <div className="text-gray-500 text-sm mb-2 w-full">
              {field.description}
            </div>
          )
        ) : (
          <input
            className="px-3 py-2 w-full border border-black/20 rounded text-sm mb-2"
            type="text"
            value={field.description || ""}
            onChange={(e) => onUpdate("description", e.target.value)}
            placeholder="Description (optional)"
          />
        )}
      </div>
      {isPreview ? (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <label className="block text-sm font-medium mb-1 sm:mb-0">
              Upload existing signature (PNG):
            </label>
            <label
              className={`inline-block px-4 py-2 bg-blue-500 text-white rounded shadow cursor-pointer transition hover:bg-blue-600 ${
                locked ? "opacity-50 cursor-not-allowed" : ""
              }`}
              style={{ pointerEvents: locked ? "none" : "auto" }}
            >
              Choose File
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new window.FileReader();
                    reader.onload = (ev) => {
                      onUpdate("value", ev.target.result);
                      onUpdate("locked", true);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                disabled={locked}
              />
            </label>
          </div>
          <div className="mb-2 text-sm text-gray-700 font-medium">
            {locked
              ? "Signature locked (click Clear to make changes):"
              : "Or create a new signature below:"}
          </div>
          {field.value ? (
            <img
              src={field.value}
              alt="Signature"
              className="border border-gray-400 rounded h-24 bg-gray-50"
              style={{ cursor: "pointer" }}
              onError={() => {
                onUpdate("value", "");
              }}
            />
          ) : (
            <SignatureCanvas
              ref={sigPadRef}
              penColor="black"
              canvasProps={{
                width: 400,
                height: 96,
                className: "border border-gray-400 rounded bg-gray-50",
              }}
              readOnly={locked}
              onEnd={() => setSigChanged((c) => c + 1)}
            />
          )}
          <div className="flex mt-2 space-x-2">
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition"
              style={{ cursor: "pointer", minWidth: 75 }}
              tabIndex={0}
            >
              Clear
            </button>
            {!locked && (
              <button
                type="button"
                onClick={() => {
                  if (field.value) {
                    onUpdate("locked", true);
                    return;
                  }
                  if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
                    const dataUrl = sigPadRef.current
                      .getCanvas()
                      .toDataURL("image/png");
                    onUpdate("value", dataUrl);
                    onUpdate("locked", true);
                  }
                }}
                className="px-3 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition"
                style={{ cursor: "pointer", minWidth: 75 }}
                tabIndex={0}
                disabled={
                  locked ||
                  ((sigPadRef.current?.isEmpty?.() ?? true) && !field.value)
                }
              >
                Confirm
              </button>
            )}
          </div>
          {locked && (
            <div className="flex items-center mt-2 text-green-600 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Signature confirmed and locked. Clear to re-sign.
            </div>
          )}
        </div>
      ) : (
        <div className="border border-gray-400 rounded h-24 bg-gray-50 flex items-center justify-center text-gray-400">
          Signature pad placeholder (editor only)
        </div>
      )}
    </div>
  );
};

export default SignatureField;
