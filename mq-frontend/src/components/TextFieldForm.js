import { useState } from "react";

// https://reactjs.org/docs/forms.html
function TextFieldForm({label, onSubmit}) {
    const [field, setField] = useState("");

    function onUpdate(event) {
        setField(event.target.value);
    }

    function formSubmitted(event) {
        onSubmit(field);
        event.preventDefault();
    }

    return (
        <form onSubmit={formSubmitted}>
            <label htmlFor="text-field">{label}</label>
            <input type="text" name="text-field" onChange={onUpdate} />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default TextFieldForm;