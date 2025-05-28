const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
console.log("routes working fine");
console.log("yoho");
router.post("/login", authController.login);
router.post("/signup", authController.signup);

module.exports = router;
