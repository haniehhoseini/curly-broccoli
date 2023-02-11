const { Router } = require("express");
const { Authorization } = require("../../../utils/authorization");
const { ROLES } = require("../../../constants/Auth");

const router = Router();

router.get("/", require("./getProducts"));
router.post("/remind-me", Authorization([ROLES.User]), require("./remindMe.js"));

module.exports = router;
