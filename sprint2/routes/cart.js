const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/cart", (req, res)=> res.sendFile(path.join(__dirname, "..", "views", "cart.html")));



module.exports = router;