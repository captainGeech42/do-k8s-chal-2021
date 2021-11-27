import { useState } from "react";
import Button from "./components/Button.js";
import axios from "axios"
import TextFieldForm from "./components/TextFieldForm.js";

function App({websocket}) {
    const [data, setData] = useState(""); // data from the test api button
    const [wsMsgs, setWsMsgs] = useState([]); // messages from websocket server

    function sendTopicToServer(topic) {
        websocket.send(topic)
    }

    websocket.onmessage = (msg) => {
        console.log(`got ws message from server: ${msg.data}`);
        console.log(msg);

        setWsMsgs([...wsMsgs, msg.data]);
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
