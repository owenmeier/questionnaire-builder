

import InputField from "./basic_field/TextInput_Field"
import RadioField from "./basic_field/Radio_Field"
import CheckField from "./basic_field/Check_Field"
import SelectionField from "./basic_field/DropDown_Field"
import SignatureField from "./basic_field/Signature_Field"


const fieldTypes = {
    input: {
        label: "Input Field",
        component: InputField,
        defaultProps: { 
            fieldType: "input", 
            question: "", 
            answer: "", 
        },
    },
    radio: {
        label: "Radio Field",
        component: RadioField,
        defaultProps: {
            fieldType: "radio",
            question: "",
            options: ["", "", ""], 
            selected: null,
        },
    },
    check: {
        label: "Check Field",
        component: CheckField,
        defaultProps: {
            fieldType: "check",
            question: "",
            options: ["", "", ""],
            selected: [],
        },
    },
    selection: {
        label: "Dropdown Field",
        component: SelectionField,
        defaultProps: {
            fieldType: "selection",
            question: "",
            options: ["", "", ""], 
            selected: null,
        },
    },

    signature: {
        label: "Signature Field",
        component: SignatureField,
        defaultProps: {
            fieldType: "signature",
            question: "Please sign below:",
            value: "",
        },
    },
}

export default fieldTypes
