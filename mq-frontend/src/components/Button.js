import styled from "@emotion/styled"

function Button({body, onClick}) {
    var Button = styled.button`
        border-radius: 5px;
    `;

    return (
        <Button onClick={onClick}>
            {body}
        </Button>
    );
}

export default Button;