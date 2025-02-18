import InputField from "./basic_field/TextInput_Field";
import RadioField from "./basic_field/Radio_Field";
import CheckField from "./basic_field/Check_Field";
import SelectionField from "./basic_field/DropDown_Field";

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
    radio: {
        label: "Radio Field",
        component: RadioField,
        defaultProps: {
            fieldType: "radio",
            question: "New Radio Question",
            options: ["Option 1", "Option 2", "Option 3"], 
            selected: null,
        },
    },
    check: {
        label: "Check Field",
        component: CheckField,
        defaultProps: {
            fieldType: "check",
            question: "New Checkbox Question",
            options: ["Option 1", "Option 2", "Option 3"],
            selected: [],
        },
    },
    selection: {
        label: "Dropdown Field",
        component: SelectionField,
        defaultProps: {
            fieldType: "selection",
            question: "New Dropdown Question",
            options: ["Option 1", "Option 2"], 
            selected: null,
        },
    },

    // import EnableWhenField from "./adv_field/EnableWhen_Field";
    // enableWhen: {
    //     label: "Enable When",
    //     component: EnableWhenField,
    //     defaultProps: {
    //         fieldType: "enableWhen",
    //         question: "New EnableWhen Condition",
    //         condition: {
    //             fieldId: null,
    //             value: "", 
    //         },
    //         field1: {
    //             id: "child-field1-id",
    //             fieldType: "input", 
    //             question: "Child Field 1",
    //             answer: "",
    //         },
    //         field2: {
    //             id: "child-field2-id",
    //             fieldType: "input", 
    //             question: "Child Field 2",
    //             answer: "",
    //         },
    //     },
    // },
};

export default fieldTypes;
