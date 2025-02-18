import React from "react";
const Header = ({ formData, setFormData, isPreview, setIsPreview }) => {
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


    return (
        <div className="fixed top-0 left-0 w-full mx-auto px-9 pt-2">
            <div className="flex flex-col min-[700px]:flex-row justify-between items-center mb-4 bg-stone-100 p-4 md:rounded-xl backdrop-blur-2xl shadow-md">

                <h1 className="text-2xl font-bold mb-2">Questionnaire Builder</h1>

                <div className="flex items-center justify-center max-[380px]:text-sm">
                    <button
                        className="px-4 py-5 mx-1 bg-blue-500 text-white rounded"
                        onClick={exportData}
                    >
                        Export
                    </button>

                    <label className="px-4 py-5 mx-1 bg-green-500 text-white rounded cursor-pointer"
                    >
                        Import
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

                    <button
                        onClick={togglePreview}
                        className="px-4 py-2 mx-1 min-[440px]:py-5 bg-indigo-500 text-white rounded"
                    >
                        {isPreview ? "Switch to Edit Mode" : "Switch to Preview"}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Header;
