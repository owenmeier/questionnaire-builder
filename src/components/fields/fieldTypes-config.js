import InputField from "./basic_field/TextInput_Field";
import ChoiceField from "./basic_field/Choice_Field";
import SelectionField from "./basic_field/DropDown_Field";
import EnableWhenField from "./adv_field/EnableWhen_Field";

const fieldTypes = {
    input: {
        label: "Input Field",
        component: InputField,
        defaultProps: { 
            fieldType: "input", 
            question: "New Input Field", 
            answer: "" 
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
    enableWhen: {
        label: "Enable When",
        component: EnableWhenField,
        defaultProps: {
            fieldType: "enableWhen",
            question: "New EnableWhen Condition",
            condition: {
                fieldId: null,
                value: "", 
            },
            field1: {
                id: "child-field1-id",
                fieldType: "input", 
                question: "Child Field 1",
                answer: "",
            },
            field2: {
                id: "child-field2-id",
                fieldType: "input", 
                question: "Child Field 2",
                answer: "",
            },
        },
    },
};

export default fieldTypes;
