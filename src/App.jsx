import React, { useState } from "react"
import FormBuilder from "./components/FormBuilderMain"

const App = () => {
    const [formData, setFormData] = useState([])

    const importData = (data) => {
        try {
            const parsedData = JSON.parse(data)
            setFormData(parsedData)
        } catch (error) {
            alert("Invalid JSON format")
        }
    }

    const exportData = () => {
        const blob = new Blob([JSON.stringify(formData, null, 2)], {
            type: "application/json",
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "form-data.json"
        a.click()
    }

    return (
        <div className="min-h-screen p-5 bg-gray-100">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Questionnaire Builder</h1>
                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={exportData}
                    >
                        Export JSON
                    </button>
                    <label className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer">
                        Import JSON
                        <input
                            type="file"
                            accept="application/json"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0]
                                const reader = new FileReader()
                                reader.onload = (event) => importData(event.target.result)
                                reader.readAsText(file)
                            }}
                        />
                    </label>
                </div>
            </div>
            <FormBuilder formData={formData} setFormData={setFormData} />
        </div>
    )
}

export default App
