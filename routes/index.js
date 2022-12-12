const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");

router.get(`${process.env.BASE_URL}/`, homeController.home);

router.use(`${process.env.BASE_URL}/questions`, require("./questions"));
router.use(`${process.env.BASE_URL}/options`, require("./options"));

module.exports = router;
