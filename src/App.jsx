import React, { useState } from "react";
import FormBuilder from "./components/FormBuilderMain";
import Header from "./components/Header"; 

const App = () => {
    const [formData, setFormData] = useState([]);
    const [isPreview, setIsPreview] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 p-5">
            <Header
                formData={formData}
                setFormData={setFormData}
                isPreview={isPreview}
                setIsPreview={setIsPreview}
            />

            <FormBuilder
                formData={formData}
                setFormData={setFormData}
                isPreview={isPreview} />
        </div>
    );
};

export default App;
