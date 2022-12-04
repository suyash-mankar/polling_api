const express = require("express");
const router = express.Router();

const questionsController = require("../controllers/questions_controller");
router.post("/create", questionsController.create);

module.exports = router;
