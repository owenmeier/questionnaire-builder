import InputField from "./basic_types/TextInput_Field";
import ChoiceField from "./basic_types/Choice_Field";
import SelectionField from "./basic_types/DropDown_Field";

const fieldTypes = {
    input: {
        label: "Input Field",
        component: InputField,
        defaultProps: {
            fieldType: "input", 
            question: "New Input Field",
            answer: "",
        },
    },
    choice: {
        label: "Multiple Choice",
        component: ChoiceField,
        defaultProps: {
            fieldType: "choice", 
            choiceType: "radio", 
            question: "New Multiple Choice Question",
            options: ["Option 1", "Option 2", "Option 3"],
            selected: [],
        },
    },
    selection: {
        label: "Dropdown",
        component: SelectionField,
        defaultProps: {
            fieldType: "selection", 
            question: "New Dropdown Question",
            options: ["Option 1", "Option 2"],
            selected: null,
        },
    },
};

export default fieldTypes;
