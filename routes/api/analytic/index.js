const { Router } = require("express");
const { Authorization } = require("../../../utils/authorization");
const { ROLES } = require("../../../constants/Auth");

const router = Router();

router.get("/last-orders", Authorization([ROLES.Admin, ROLES.User]), require("./lastOrders"));

module.exports = router;
