const express = require("express");
const router = express.Router();

router.get("/config", (req, res) => {
    res.send({
        "websocket_host": process.env.WS_HOST || "localhost",
        "websocket_port": process.env.WS_PORT || 4000
    });
});

module.exports = router;