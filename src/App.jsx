import React, { useState } from "react"

import FormBuilder from "./components/FormBuilderMain"
import Header from "./components/Header"
import fieldTypes from "./components/fields/fieldTypes-config"
import { v4 as uuidv4 } from "uuid"
import { initializeField } from "./utils/initializedFieldOptions"


const App = () => {
    const [formData, setFormData] = useState([])
    const [isPreview, setIsPreview] = useState(false)

    // Add field to formData (moved up from FormBuilderMain)
    const addField = (type) => {
        const fieldTemplate = fieldTypes[type]?.defaultProps;
        if (fieldTemplate) {
            const initializedField = initializeField({
                ...fieldTemplate,
                id: uuidv4(),
            });
            setFormData((prev) => [...prev, initializedField]);
        } else {
            alert("Unknown field type");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header
                formData={formData}
                setFormData={setFormData}
                addField={addField}
                fieldTypes={fieldTypes}
                isPreview={isPreview}
                setIsPreview={setIsPreview}
            />
            <FormBuilder
                formData={formData}
                setFormData={setFormData}
                isPreview={isPreview}
                setIsPreview={setIsPreview}
                addField={addField}
                fieldTypes={fieldTypes}
            />
        </div>
    )
}

export default App
