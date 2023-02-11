const { Router } = require("express");
const { Authorization } = require("../../../utils/authorization");
const { ROLES } = require("../../../constants/Auth");

const router = Router();

router.post("/login", require("./login"));
router.post("/register", require("./register"));
router.get("/emailVerify/:verifyToken/:token", require("./emailVerify"));

// Protected Routes
router.get("/ping", Authorization([ROLES.User]), (req, res) =>
  res.json({ message: "pong" }),
);

module.exports = router;
