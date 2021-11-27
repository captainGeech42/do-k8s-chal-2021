import { useState } from "react";
import TextFieldForm from "./components/TextFieldForm.js";

function App({websocket}) {
    const [wsMsgs, setWsMsgs] = useState([]); // messages from websocket server

    function sendMessageToServer(message) {
        websocket.send(JSON.stringify({
            action: "new_message",
            topic: "test_topic",
            message: message
        }));
    }

    function addMsg(msg) {
        setWsMsgs([...wsMsgs, msg]);
    }

    websocket.onmessage = (msg) => {
        console.log(`got ws message from server: ${msg.data}`);

        try {
            const data = JSON.parse(msg.data);
            switch (data.action) {
                case "message_received":
                    addMsg(data.msg)
                    break;
                default:
                    addMsg(`Unknown action: ${data.action}`);
                    break;
            }
        } catch {
            addMsg(`Non JSON data from server: ${msg.data}`);
        }
    }

    return (
        <div>
            <h1>Message Queue Demo App</h1>
            <p>
                This is a small demo app for the Digital Ocean Kubernetes Challenge 2021. See the repo for this project <a target="_blank" rel="noreferrer" href="https://github.com/captainGeech42/do-k8s-chal-2021">here</a>.
            </p>
            <br/>
            {<TextFieldForm label="Send Message" onSubmit={sendMessageToServer} /> } 
            <br/>
            <h2>Messages</h2>
            <div>
                {wsMsgs.map((d, idx) => (
                    <p key={idx}>{d}</p>
                ))}
            </div>
        </div>
    );
}

export default App;
