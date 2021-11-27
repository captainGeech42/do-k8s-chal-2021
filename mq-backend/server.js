const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { Kafka } = require("kafkajs");

const app = express();

var expressWs = require("express-ws")(app);

const port = process.env.PORT || 4000;

var brokers;
if (process.env.NODE_ENV === "production") {
    // running in docker, use the one from the docker network
    brokers = ["kafka:29092"];
} else {
    // running locally, use the port forwarded connection
    brokers = ["localhost:29092"];
}

const kafka = new Kafka({
    clientId: "mq-app",
    brokers: brokers
});

app.use(morgan("combined"));

app.ws("/", (ws, req) => {
    ws.on("message", (msg) => {
        console.log(`[WS] new message: ${msg}`);
        ws.send(`ack message: ${msg}`);
    });
});

app.get("/test", (_, res) => {
    res.send("hello world");
});

// https://github.com/conor-deegan/web-app-boilerplate/blob/master/server.js#L33
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client_build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client_build', 'index.html'));
    });
};

app.listen(port, () => {
    console.log(`listening on ${port}`);
});