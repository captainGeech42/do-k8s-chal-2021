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
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="text-field">{label}</label>
                        </td>
                        <td>
                            <input type="text" name="text-field" onChange={onUpdate} />
                        </td>
                        <td>
                            <input type="submit" value="Submit" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

export default TextFieldForm;