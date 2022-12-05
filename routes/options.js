const express = require("express");
const router = express.Router();

const optionsController = require("../controllers/options_controller");

router.post("/:id/create", optionsController.create);
router.get("/:id/delete", optionsController.delete);
router.get("/:id/add_vote", optionsController.addVote);

module.exports = router;
