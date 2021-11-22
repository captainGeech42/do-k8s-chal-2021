const express = require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || 3100;

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