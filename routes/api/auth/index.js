const { Router } = require("express");

const router = Router();

router.post("/login", require('./login'));
router.post("/register", require('./register'));
router.get("/emailVerify/:verifyToken/:token", require('./emailVerify'));

module.exports = router;