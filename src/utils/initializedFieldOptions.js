
export const generateUniqueId = () => `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const initializeFieldOptions = (options) => {
    return options.map((option) =>
        typeof option === "string"
            ? { id: generateUniqueId(), value: option } 
            : { ...option, id: option.id || generateUniqueId() } 
    );
};


export const initializeField = (field) => {
    return {
        ...field,
        options: initializeFieldOptions(field.options || []),
    };
};

