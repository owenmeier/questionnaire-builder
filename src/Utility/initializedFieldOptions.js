// utils/initializeFieldOptions.js

const generateUniqueId = () => `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Function to ensure all options have unique IDs
export const initializeFieldOptions = (options) => {
    return options.map((option) =>
        typeof option === "string"
            ? { id: generateUniqueId(), value: option } // Convert string to object with ID
            : { ...option, id: option.id || generateUniqueId() } // Ensure existing objects have an ID
    );
};

// Function to initialize a field
export const initializeField = (field) => {
    return {
        ...field,
        options: initializeFieldOptions(field.options || []),
    };
};
