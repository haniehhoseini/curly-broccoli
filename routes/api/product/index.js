const { Router } = require("express");
const { Authorization } = require("../../../utils/authorization");
const { ROLES } = require("../../../constants/Auth");

const router = Router();

router.get("/", require("./getProducts"));

module.exports = router;
