const express = require("express");
const kafka = require("./kafka/kafka.js");
const config = require("./config/config.js");

const router = express.Router();

router.use("/kafka", kafka);
router.use("/config", config);

module.exports = router;