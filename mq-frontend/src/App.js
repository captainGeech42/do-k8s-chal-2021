import { useEffect, useState } from "react";
import Button from "./components/Button.js";
import axios from "axios"
import TextFieldForm from "./components/TextFieldForm.js";

const ws = new WebSocket("ws://localhost:4000");

function App() {
    const [data, setData] = useState(""); // data from the test api button
    const [wsMsgs, setWsMsgs] = useState([]); // messages from websocket server
    const [connectedToWS, setConnectedToWS] = useState(false); // connection status to the websocker server

    function click() {
        console.log("clicked");
        axios.get("/test").then((res) => {
            const data = res.data;
            setData(data);
        });
    }

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
    });

    return (
        <div>
            <Button body="test button" onClick={click}/>
            <br/>
            <h1>{data}</h1>
            <br/>
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

export default App;
