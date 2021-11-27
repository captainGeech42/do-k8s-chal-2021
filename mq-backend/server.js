const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { Kafka } = require("kafkajs");
const ON_DEATH = require('death');

const app = express();
app.use(morgan("combined"));
const expressWs = require("express-ws")(app);
const wss = expressWs.getWss();

const port = process.env.PORT || 4000;

const kafka_host = process.env.KAFKA_HOST || "localhost";
const kafka_port = process.env.KAFKA_PORT || "29092";
const kafka = new Kafka({
    clientId: "mq-app",
    brokers: [`${kafka_host}:${kafka_port}`] 
});

const kafka_producer = kafka.producer();
const kafka_consumer = kafka.consumer({ groupId: "mq-demo-app-group" });
kafka_consumer.subscribe({ topic: "test_topic", fromBeginning: true });

kafka_consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log(`[Kafka] new message on topic "${topic}": ${message.value.toString()}`);

        // broadcast the message to each connected client
        // jank but works
        wss.clients.forEach((c) => {
            c.send(JSON.stringify({
                action: "message_received",
                msg: message.value.toString()
            }));
        });
    }
});

app.ws("/", (ws) => {
    ws.on("message", (msg) => {
        const data = JSON.parse(msg);

        switch (data.action) {
            case "new_message":
                console.log(`[WS] sending message to topic "${data.topic}": ${data.message}`);

                kafka_producer.send({
                    topic: data.topic,
                    messages: [
                        { value: data.message }
                    ]
                }).then(() => {
                    // ws.send("message sent");
                })

                break;
            default:
                console.log(`[WS] unknown action: ${data.action}`);
                break;
        }
    });
});

app.get("/config", (_, res) => {
    res.send({
        "websocket_host": process.env.WS_HOST || "localhost",
        "websocket_port": process.env.WS_PORT || 4000
    });
});

// https://github.com/conor-deegan/web-app-boilerplate/blob/master/server.js#L33
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client_build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client_build', 'index.html'));
    });
};

var server;
kafka_producer.connect()
.then(() => kafka_consumer.connect())
.then(() => {
    server = app.listen(port, () => {
        console.log(`listening on ${port}`);
    });
});

ON_DEATH((sig, err) => {
    kafka_producer.disconnect()
    .then(() => kafka_consumer.disconnect())
    .then(() => server.close());
});