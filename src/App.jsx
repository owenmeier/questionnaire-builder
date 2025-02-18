import React, { useState } from "react";
import FormBuilder from "./components/FormBuilderMain";

const App = () => {
    const [formData, setFormData] = useState([]);
    const [isPreview, setIsPreview] = useState(false);

    // Import and export data functions
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

    const togglePreview = () => setIsPreview(!isPreview);
    const consolelogData = () => console.log("Form Data:", formData);

    return (
        <div className="min-h-screen bg-gray-100 p-5">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-2 sm:mb-0">Questionnaire Builder</h1>
                <div className="flex gap-2 flex-wrap">
                    {/* Export JSON Button */}
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={exportData}
                    >
                        Export JSON
                    </button>

                    {/* Import JSON Button */}
                    <label className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer">
                        Import JSON
                        <input
                            type="file"
                            accept="application/json"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                const reader = new FileReader();
                                reader.onload = (event) => importData(event.target.result);
                                reader.readAsText(file);
                            }}
                        />
                    </label>

                    {/* Preview Mode Toggle Button */}
                    <button
                        onClick={togglePreview}
                        className="px-4 py-2 bg-indigo-500 text-white rounded"
                    >
                        {isPreview ? "Switch to Edit Mode" : "Switch to Preview Mode"}
                    </button>

                    {/* Log Data Button */}
                    <button
                        onClick={consolelogData}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Log Data
                    </button>
                </div>
            </div>

            {/* FormBuilder Component */}
            <FormBuilder formData={formData} setFormData={setFormData} isPreview={isPreview} />
        </div>
    );
};

export default App;
