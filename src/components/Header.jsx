import React, { useState, useEffect } from "react";
import {
  DATALOG_ICON,
  EYEEDIT_ICON,
  EYECLOSED_ICON,
  PLUSSQUARE_ICON,
  X_ICON,
} from "../assets/icons";
import { motion } from "framer-motion";

const Header = ({
  formData,
  setFormData,
  addField,
  fieldTypes,
  isPreview,
  setIsPreview,
}) => {
  const [isToolBarExpanded, setIsToolBarExpanded] = useState(false);
  const [isLogExpanded, setIsLogExpanded] = useState(false);

  const handleToolBarExpanded = () => {
    setIsToolBarExpanded(!isToolBarExpanded);
    setIsLogExpanded(false);
  };
  const handleLogExpanded = () => {
    setIsLogExpanded(!isLogExpanded);
    setIsToolBarExpanded(false);
  };
  const handlePreviewMode = () => {
    setIsPreview(!isPreview);
    setIsToolBarExpanded(false);
    setIsLogExpanded(false);
  };
  const handleClickOutside = (event) => {
    if (!event.target.closest(".navbar-container")) {
      setIsToolBarExpanded(false);
      setIsLogExpanded(false);
    }
  };
  useEffect(() => {
    if (isToolBarExpanded || isLogExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isToolBarExpanded, isLogExpanded]);
  const importData = (data) => {
    try {
      const parsedData = JSON.parse(data);
      setFormData(parsedData);
    } catch (error) {
      alert("Invalid JSON format");
    }
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "form-data.json";
    a.click();
  };

  return (
    <div className="navbar-container sticky top-0 left-0 w-full mx-auto z-50 bg-white shadow-lg">
      <div className="flex flex-col min-[700px]:flex-row justify-between items-center p-4 md:rounded-xl">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">
          Questionnaire Builder
        </h1>
        <div className="flex items-center justify-center flex-wrap gap-2">
          {/* Preview/Edit Mode Button */}
          <button
            onClick={handlePreviewMode}
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
            title={isPreview ? "Switch to Edit Mode" : "Switch to Preview Mode"}
          >
            {!isPreview ? (
              <EYECLOSED_ICON className="h-8 w-8" />
            ) : (
              <EYEEDIT_ICON className="h-8 w-8" />
            )}
          </button>
          {/* Add Field Button*/}
          {!isPreview && (
            <button
              onClick={handleToolBarExpanded}
              className="bg-blue-200 hover:bg-blue-300 rounded-full p-2"
              title="Add Field"
            >
              <PLUSSQUARE_ICON className="h-8 w-8" />
            </button>
          )}
          {/* JSON Log Button */}
          <button
            onClick={handleLogExpanded}
            className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
            title="Show JSON Data"
          >
            <DATALOG_ICON className="h-8 w-8" />
          </button>
          {/* Export Button */}
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
            onClick={exportData}
          >
            Export
          </button>
          {/* Import Button */}
          <label className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded cursor-pointer">
            Import
            <input
              className="hidden"
              type="file"
              accept="application/json"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => importData(event.target.result);
                reader.readAsText(file);
              }}
            />
          </label>
        </div>
      </div>
      {/* Add Field Modal */}
      <motion.div
        initial={{ opacity: 0, y: "-100%", scale: 0 }}
        animate={{
          opacity: isToolBarExpanded ? 1 : 0,
          y: isToolBarExpanded ? "0%" : "-100%",
          scale: isToolBarExpanded ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 w-1/4 max-w-md bg-white border border-gray-200 px-6 py-4 rounded-2xl shadow-xl z-50"
        style={{ pointerEvents: isToolBarExpanded ? "auto" : "none" }}
      >
        <button
          className="flex w-full justify-end"
          onClick={() => setIsToolBarExpanded(false)}
        >
          <X_ICON />
        </button>
        <h3 className="px-4 font-bold text-lg mb-4 underline underline-offset-4">
          Add Field
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {fieldTypes && typeof fieldTypes === "object" ? (
            Object.keys(fieldTypes).map((type) => (
              <button
                key={type}
                className="px-4 pl-6 py-2 text-black text-lg text-left rounded hover:bg-slate-100"
                onClick={() => {
                  addField(type);
                  setIsToolBarExpanded(false);
                }}
              >
                {fieldTypes[type].label}
              </button>
            ))
          ) : (
            <div className="text-red-500">No field types available</div>
          )}
        </div>
      </motion.div>
      {/* JSON Data Log Modal */}
      <motion.div
        initial={{ opacity: 0, y: "-100%", scale: 0 }}
        animate={{
          opacity: isLogExpanded ? 1 : 0,
          y: isLogExpanded ? "0%" : "-100%",
          scale: isLogExpanded ? 1 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-xl bg-white border border-gray-200 px-6 py-4 rounded-2xl shadow-xl z-50"
        style={{ pointerEvents: isLogExpanded ? "auto" : "none" }}
      >
        <button
          className="flex w-full justify-end"
          onClick={() => setIsLogExpanded(false)}
        >
          <X_ICON />
        </button>
        <h3 className="font-bold text-lg mb-4">Form Data (JSON)</h3>
        <div className="p-4 rounded-lg overflow-y-auto max-h-80 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400">
          <pre className="whitespace-pre-wrap break-words text-sm text-gray-700">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
