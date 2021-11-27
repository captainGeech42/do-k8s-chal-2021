const express = require("express");
const router = express.Router();

router.get("/echo", (req, res) => {
    res.send("echo back");
});

module.exports = router;