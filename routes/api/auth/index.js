const { Router } = require("express");

const router = Router();

router.post("/login", require('./login'));
router.post("/register", require('./register'));

module.exports = router;