const express = require("express");
const router = express.Router();

router.get('/', )


router.use("/questions", require("./questions"));
router.use("/options", require("./options"));

module.exports = router;
