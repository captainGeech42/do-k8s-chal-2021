import { useState } from "react";
import Button from "./components/Button.js";
import axios from "axios"
import TextFieldForm from "./components/TextFieldForm.js";

function App({websocket}) {
    const [data, setData] = useState(""); // data from the test api button
    const [wsMsgs, setWsMsgs] = useState([]); // messages from websocket server

    function sendTopicToServer(topic) {
        websocket.send(JSON.stringify({
            action: "new_topic",
            name: topic,
        }));
    }
    
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
        console.log(msg);



        try {
            const data = JSON.parse(msg.data);
            switch (data.action) {
                case "topic_created":
                    addMsg(`New topic created: ${data.name}`);
                    break;
                case "message_received":
                    addMsg(`Message received: ${data.msg}`);
                    break;
                default:
                    addMsg(`Unknown action: ${data.action}`);
                    break;
            }
        } catch {
            addMsg(`Non JSON data from server: ${msg.data}`);
        }
    }

    function click() {
        console.log("clicked");
        axios.get("/test").then((res) => {
            const data = res.data;
            setData(data);
        });
    }

    return (
        <div>
            <Button body="test button" onClick={click}/>
            <br/>
            <h1>{data}</h1>
            <br/>
            {<TextFieldForm label="Add Topic" onSubmit={sendTopicToServer} /> } 
            {<TextFieldForm label="Send Message" onSubmit={sendMessageToServer} /> } 
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
