import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from "axios"


axios.get("/api/v1/config/config").then((res) => {
    const ws = new WebSocket(`ws://${res.data.websocket_host}:${res.data.websocket_port}`);
    ws.onopen = () => {
        console.log("connected to ws");
        ws.send("hello world");
    }

    ReactDOM.render(
        <React.StrictMode>
            <App websocket={ws} />
        </React.StrictMode>,
        document.getElementById('root')
    );
});