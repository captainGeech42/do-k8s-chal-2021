import { useEffect, useState } from "react";
import Button from "./components/Button.js";
import axios from "axios"
import WebsocketServer from "./components/WebsocketServer.js";

function App() {
    const [data, setData] = useState(""); // data from the test api button
    const [wsConnData, setWsConnData] = useState(false);

    function click() {
        console.log("clicked");
        axios.get("/test").then((res) => {
            const data = res.data;
            setData(data);
        });
    }

    useEffect(() => {
        axios.get("/api/v1/config/config").then((res) => {
            setWsConnData(res.data);
        });
    }, []);

    return (
        <div>
            <Button body="test button" onClick={click}/>
            <br/>
            <h1>{data}</h1>
            <br/>
            {wsConnData && <WebsocketServer host={wsConnData.websocket_host} port={wsConnData.websocket_port} />}
        </div>
    );
}

export default App;
