import { useEffect, useState } from "react";
import TextFieldForm from "./TextFieldForm.js";

function WebsocketServer({host, port}) {
    const ws = new WebSocket(`ws://${host}:${port}`);
    
    const [wsMsgs, setWsMsgs] = useState([]); // messages from websocket server
    const [connectedToWS, setConnectedToWS] = useState(false); // connection status to the websocker server

    function sendTopicToServer(topic) {
        ws.send(topic)
    }
    
    useEffect(() => {
        ws.onopen = () => {
            console.log("connected to ws");
            ws.send("hello world");
            setConnectedToWS(true);
        }

        ws.onmessage = (msg) => {
            console.log(`got ws message from server: ${msg.data}`);
            console.log(msg);

            setWsMsgs([...wsMsgs, msg.data]);
        }
    }, []);

    return (
        <div>
            {connectedToWS && <TextFieldForm label="Add Topic" onSubmit={sendTopicToServer} /> } 
            <br/>
            <br/>
            <div>
                {wsMsgs.map((d) => (
                    <p key={d}>{d}</p>
                ))}
            </div>
        </div>
    );
}

export default WebsocketServer;