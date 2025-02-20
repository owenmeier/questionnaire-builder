import React, { useState, useEffect } from "react";

const DEFAULT_CONDITION = {
    fieldId: "",
    operator: "equals",
    value: ""
};

/**
 * Returns allowed operators based on the trigger field's type
 */
function getOperatorsForFieldType(fieldType) {
    switch (fieldType) {
        case "input":
            // Text input => "equals" or "contains"
            return ["equals", "contains"];
        case "radio":
            // Radio => "equals"
            return ["equals"];
        case "check":
            // Checkbox => "includes"
            return ["includes"];
        case "selection":
            // Dropdown => "equals"
            return ["equals"];
        default:
            // Fallback => possibly just "equals" or none
            return ["equals"];
    }
}

const EnableWhenLogic = ({ fieldId, formData, onUpdate }) => {
    const parentField = formData.find((f) => f.id === fieldId);
    const existing = parentField?.enableWhen || {
        logic: "AND",
        conditions: []
    };

    const [logic, setLogic] = useState(existing.logic || "AND");
    const [conditions, setConditions] = useState(existing.conditions || []);

    useEffect(() => {
        setLogic(existing.logic || "AND");
        setConditions(existing.conditions || []);
    }, [existing.logic, existing.conditions]);

    const syncToParent = (newLogic, newConditions) => {
        onUpdate("enableWhen", {
            logic: newLogic,
            conditions: newConditions
        });
    };

    // - Toggle AND/OR
    const handleLogicChange = (e) => {
        const newLogic = e.target.value;
        setLogic(newLogic);
        syncToParent(newLogic, conditions);
    };

    // - Add a new empty condition row
    const handleAddCondition = () => {
        const newConditions = [...conditions, { ...DEFAULT_CONDITION }];
        setConditions(newConditions);
        syncToParent(logic, newConditions);
    };

    // - Remove a condition row
    const handleRemoveCondition = (idx) => {
        const newConditions = conditions.filter((_, i) => i !== idx);
        setConditions(newConditions);
        syncToParent(logic, newConditions);
    };

    // - Update a condition (fieldId/operator/value)
    // - Update a condition (fieldId/operator/value)
    const handleConditionChange = (idx, key, val) => {
        let newConditions = conditions.map((c, i) => {
            if (i === idx) {
                const updated = { ...c, [key]: val };

                // If the user just changed the fieldId, auto-set the operator
                // to something valid for that fieldType if needed.
                if (key === "fieldId") {
                    const chosenField = formData.find(f => f.id === val);
                    if (chosenField?.fieldType === "check" && updated.operator === "equals") {
                        updated.operator = "includes";
                    }
                    // similarly, if they pick a radio field but had "contains" set, fix to "equals", etc.
                }
                return updated;
            }
            return c;
        });

        setConditions(newConditions);
        syncToParent(logic, newConditions);
    };


    return (
        <div className="p-2 border border-gray-300 rounded bg-gray-50">
            <div className="flex items-center space-x-2 mb-2">
                <label className="font-semibold">Logic:</label>
                <select
                    value={logic}
                    onChange={handleLogicChange}
                    className="border p-1 rounded"
                >
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                </select>
                <button
                    onClick={handleAddCondition}
                    className="px-2 py-1 bg-green-200 border rounded"
                >
                    + Condition
                </button>
            </div>

            {/* Render each condition row */}
            {conditions.map((cond, idx) => {
                const { fieldId: triggerFieldId, operator, value } = cond;

                // 1) Identify the trigger field
                const triggerField = formData.find((f) => f.id === triggerFieldId);
                // 2) Which fieldType is it?
                const triggerFieldType = triggerField?.fieldType;
                // 3) Allowed operators for that field
                const allowedOperators = getOperatorsForFieldType(triggerFieldType);

                //if field has Options --> dropdown, if its userinput --> text input
                const hasOptions = triggerField?.options?.length > 0;

                return (
                    <div
                        key={idx}
                        className="flex items-center space-x-2 mb-1 border-b pb-1"
                    >
                        {/* Field selector */}
                        <select
                            value={triggerFieldId}
                            onChange={(e) =>
                                handleConditionChange(idx, "fieldId", e.target.value)
                            }
                            className="border p-1 rounded"
                        >
                            <option value="">--Select Field--</option>
                            {formData
                                .filter((f) => f.id !== fieldId) // exclude self
                                .map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.question || `Field ${f.id}`}
                                    </option>
                                ))}
                        </select>

                        {/* Operator selector */}
                        {/* If triggerField isn't selected, we can't know the fieldType => fallback to all operators or empty */}
                        <select
                            value={operator}
                            onChange={(e) =>
                                handleConditionChange(idx, "operator", e.target.value)
                            }
                            className="border p-1 rounded"
                            disabled={!triggerFieldType}
                        >
                            {triggerFieldType ? (
                                allowedOperators.map((op) => (
                                    <option key={op} value={op}>
                                        {op}
                                    </option>
                                ))
                            ) : (
                                <option value="">--Pick Field First--</option>
                            )}
                        </select>

                        {/* Value input */}
                        {hasOptions ? (
                            // If the trigger field has options, let them pick from them
                            <select
                                value={value}
                                onChange={(e) =>
                                    handleConditionChange(idx, "value", e.target.value)
                                }
                                className="border p-1 rounded"
                                disabled={!triggerFieldType}
                            >
                                <option value="">--Select Option--</option>
                                {triggerField.options.map((opt) => (
                                    <option key={opt.id} value={opt.id}>
                                        {opt.value}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            // Otherwise, let them type text
                            <input
                                type="text"
                                className="border p-1 rounded"
                                placeholder="Enter text value"
                                value={value}
                                onChange={(e) =>
                                    handleConditionChange(idx, "value", e.target.value)
                                }
                                disabled={!triggerFieldType}
                            />
                        )}

                        <button
                            onClick={() => handleRemoveCondition(idx)}
                            className="px-2 py-1 bg-red-200 border rounded"
                        >
                            X
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default EnableWhenLogic;
