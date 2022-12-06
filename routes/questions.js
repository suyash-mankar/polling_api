const express = require("express");
const router = express.Router();

const questionsController = require("../controllers/questions_controller");

router.post("/create", questionsController.create);
router.get("/:id/delete", questionsController.delete);
router.get("/:id", questionsController.view);

module.exports = router;
