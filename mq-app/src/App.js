import { Component, useState } from "react";
import Button from "./components/Button.js";
import axios from "axios"

function App() {
    const [data, setData] = useState(0);

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
        </div>
    );
}

export default App;
