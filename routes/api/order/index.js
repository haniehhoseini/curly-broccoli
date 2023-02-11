const { Router } = require("express");
const { Authorization } = require("../../../utils/authorization");
const { ROLES } = require("../../../constants/Auth");

const router = Router();

router.post("/pay", Authorization([ROLES.Admin, ROLES.User]), require("./pay"));
router.post("/cancel", Authorization([ROLES.Admin, ROLES.User]), require("./cancel"));
router.post("/rate", Authorization([ROLES.Admin, ROLES.User]), require("./rate"));

module.exports = router;
