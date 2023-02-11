const { Router } = require("express");
const { Authorization } = require("../../../utils/authorization");
const { ROLES } = require("../../../constants/Auth");

const router = Router();

router.get("/pay", Authorization([ROLES.Admin, ROLES.User]), require("./pay"));

module.exports = router;
