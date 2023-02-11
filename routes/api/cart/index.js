const { Router } = require("express");
const { Authorization } = require("../../../utils/authorization");
const { ROLES } = require("../../../constants/Auth");

const router = Router();

router.post(
  "/add-to-cart",
  Authorization([ROLES.Admin, ROLES.User]),
  require("./addToCart"),
);

router.post(
  "/submit-cart",
  Authorization([ROLES.Admin, ROLES.User]),
  require("./submitCart"),
);

module.exports = router;
