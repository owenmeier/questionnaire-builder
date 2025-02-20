import React, { useState, useEffect } from "react";
import { DATALOG_ICON, PLUSSQUARE_ICON } from "../assets/icons";
import { motion } from "framer-motion";

const MobileToolBar = ({ addField, fieldTypes, formData }) => {
    const [isToolBarExpanded, setIsToolBarExpanded] = useState(false);
    const [isLogExpanded, setIsLogExpanded] = useState(false);

    const handleToolBarExpanded = () => {
        setIsToolBarExpanded(!isToolBarExpanded)
        setIsLogExpanded(false)
    };
    const handleLogExpanded = () => {
        setIsLogExpanded(!isLogExpanded)
        setIsToolBarExpanded(false)
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

    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 bg-gray-800 text-stone-900 shadow-lg navbar-container z-10">

        {/*JSON DATA LOG BUTTON */}
            <motion.button
                onClick={handleLogExpanded}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: isLogExpanded || isToolBarExpanded ? 0 : 1, scale: isLogExpanded || isToolBarExpanded ? 0 : 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pb-20 pl-32 cursor-pointer"
            >
                <DATALOG_ICON className="h-12 w-12" />
            </motion.button>

        {/*TOOL BAR BUTTON */}
            <motion.button
                onClick={handleToolBarExpanded}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: isToolBarExpanded ? 0 : 1, scale: isToolBarExpanded ? 0 : 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pb-20 cursor-pointer"
            >
                <PLUSSQUARE_ICON className="h-12 w-12" />
            </motion.button>

        {/*JSON DATA LOG MODAL DIV*/}
            <motion.div
                initial={{ opacity: 0, x: "100%", scale: 0 }}
                animate={{ opacity: isLogExpanded ? 1 : 0, x: isLogExpanded ? "0%" : "100%", scale: isLogExpanded ? 1 : 0.6 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="absolute isolate bottom-0 w-full bg-stone-100/30 border-black/15 border px-6 py-4 mb-20 max-h-96 rounded-2xl backdrop-blur-xl overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400"
            >
                <div className="p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-4">Form Data (JSON)</h3>
                    <pre className="whitespace-pre-wrap break-words text-sm text-gray-700">
                        {JSON.stringify(formData, null, 2)}
                    </pre>
                </div>
            </motion.div>

        {/*TOOLBAR MODAL DIV */}
            <motion.div
                initial={{ opacity: 0, y: "100%", scale: 0 }}
                animate={{ opacity: isToolBarExpanded ? 1 : 0, y: isToolBarExpanded ? "0%" : "100%", scale: isToolBarExpanded ? 1 : 0.6 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                className="absolute bottom-0 w-full mx-auto bg-stone-100/30 border-black/15 border px-9 py-4 mb-2 rounded-2xl backdrop-blur-xl overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400"
            >
                <div className="grid grid-cols-1 gap-2">
                    {Object.keys(fieldTypes).map((type) => (
                        <button
                            key={type}
                            className="px-4 pl-6 py-2 text-black text-left rounded hover:bg-slate-50"
                            onClick={() => {
                                addField(type)
                                setIsToolBarExpanded(!isToolBarExpanded)
                            }}
                        >
                            Add {fieldTypes[type].label}
                        </button>
                    ))}
                </div>

            </motion.div>
        </div>
    );
};

export default MobileToolBar;
