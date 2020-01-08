const express = require("express");

const router = express.Router();
const entriesController = require("../controllers/entries");

router.get("/", entriesController.getAll);

router.post("/", entriesController.create);

module.exports = router;
