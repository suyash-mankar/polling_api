const express = require("express");
const router = express.Router();

const optionsController = require("../controllers/options_controller");

router.post("/:id/create", optionsController.create);

module.exports = router;
