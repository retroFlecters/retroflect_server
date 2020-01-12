const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.get("/signout", authController.signout);

module.exports = router;
