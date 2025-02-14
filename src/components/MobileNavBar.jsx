import React, { useState, useEffect } from "react";
import { PLUSSQUARE_ICON } from "../assets/icons";
import { motion } from "framer-motion";

const BottomNavBar = ({ isPreview, togglePreview, addField, fieldTypes, formData }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => setIsExpanded(!isExpanded);

    const consolelogData = () => {
        console.log("Form Data:", formData);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest(".navbar-container")) {
            setIsExpanded(false);
        }
    };

    useEffect(() => {
        if (isExpanded) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isExpanded]);

    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 bg-gray-800 text-stone-900 shadow-lg navbar-container z-10">
            <motion.button
                onClick={handleExpand}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: isExpanded ? 0 : 1, scale: isExpanded ? 0 : 1 }}
                exit={{ opacity: 0 }}
                className="absolute -right-3 bottom-4 mr-3"
            >
                <PLUSSQUARE_ICON className="h-12 w-12" />
            </motion.button>
            <motion.div
                initial={{ opacity: 0, x: "100%", scale: 0 }}
                animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? "0%" : "100%", scale: isExpanded ? 1 : .6 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="absolute isolate bottom-0 w-full bg-stone-100/30 border-black/15 border px-6 py-4 mb-2 rounded-2xl backdrop-blur-xl overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400"
            >
                <div>
                    <button
                        onClick={togglePreview}
                        className="px-4 py-2 rounded text-center font-bold"
                    >
                        {isPreview ? "Switch to Edit Mode" : "Switch to Preview Mode"}
                    </button>
                    <button
                        onClick={consolelogData}
                        className="px-4 py-2 rounded text-center font-bold"
                    >
                        Log data
                    </button>
                </div>
                {!isPreview && (
                    <div className="grid grid-cols-1 gap-2">
                        {Object.keys(fieldTypes).map((type) => (
                            <button
                                key={type}
                                className="px-4 pl-6 py-2 text-black text-left rounded hover:bg-slate-50"
                                onClick={() => addField(type)}
                            >
                                Add {fieldTypes[type].label}
                            </button>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default BottomNavBar;
