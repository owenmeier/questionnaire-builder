import React, { useState } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import {
  EDIT_ICON,
  PLUSOPTION_ICON,
  TRASHCAN_ICON,
  TRASHCANTWO_ICON,
} from "../../../assets/icons";
import EnableWhenLogic from "../../EnableWhenLogic";

const RadioField = ({
  field,
  label,
  onUpdate,
  onDelete,
  isPreview,
  formData,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleIsEdit = () => {
    setIsEdit(!isEdit);
  };

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
      {/*FIELD TITLE BAR */}
      {!isPreview && (
        <>
          <div className="flex justify-between items-center mb-2">
            <div className="text-lg font-bold text-gray-700">{label}</div>
            <div>
              <button onClick={handleIsEdit}>
                <EDIT_ICON className="cursor-pointer" />
              </button>
              <button
                onClick={onDelete}
                className="px-2 py-1 text-black/80 hover:text-red-600"
              >
                <TRASHCAN_ICON className="cursor-pointer" />
              </button>
            </div>
          </div>
          <motion.div
            initial={{ height: "auto", opacity: 1 }}
            animate={{ height: isEdit ? "auto" : 0, opacity: isEdit ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`overflow-hidden ${
              !isEdit ? "pointer-events-none" : ""
            }`}
          >
            <EnableWhenLogic
              fieldId={field.id}
              formData={formData}
              onUpdate={onUpdate}
            />
          </motion.div>
        </>
      )}

      {/*FIELD QUESTION BOX */}
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
      {/*FIELD DESCRIPTION BOX */}
      <div className="flex justify-between mb-2">
        {isPreview ? (
          field.description && (
            <div className="text-gray-500 text-sm mb-2 w-full">
              {field.description}
            </div>
          )
        ) : (
          <input
            className="px-3 py-2 w-full border border-black/20 rounded text-sm"
            type="text"
            value={field.description || ""}
            onChange={(e) => onUpdate("description", e.target.value)}
            placeholder="Description (optional)"
          />
        )}
      </div>

      {/*FIELD OPTIONS */}
      <div>
        {field.options
          .filter((option) => !isPreview || option.value.trim() !== "")
          .map((option) => (
            <div
              key={option.id}
              className="flex items-center px-3 py-1 my-1 shadow border border-black/10 rounded-lg"
            >
              <input
                id={`option-${option.id}`}
                type="radio"
                name={`question-${field.id}`}
                className="mr-2"
                checked={field.selected === option.id}
                onChange={() => handleSelectionChange(option.id)}
                disabled={!isPreview}
              />
              <label
                htmlFor={`option-${option.id}`}
                className={`w-full ${isPreview ? "px-3 py-2" : ""}`}
              >
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
              {/*DELETE OPTION BUTTON (ENABLE / DISABLE BASED ON THE STATE OF PREVIEW) */}
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
                  <TRASHCANTWO_ICON className="cursor-pointer" />
                </button>
              )}
            </div>
          ))}
      </div>

      {/*ADD OPTION BUTTON (ENABLE / DISABLE BASED ON THE STATE OF PREVIEW) */}
      {!isPreview && (
        <button
          onClick={addOption}
          className="mt-2 px-2 py-0 bg-indigo-500 text-white rounded-lg"
        >
          <PLUSOPTION_ICON className="h-10 w-10 cursor-pointer" />
        </button>
      )}
    </div>
  );
};

export default RadioField;
