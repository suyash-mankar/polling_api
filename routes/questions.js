const express = require("express");
const router = express.Router();

const questionsController = require("../controllers/questions_controller");
router.get("/create", questionsController.create);

module.exports = router;
