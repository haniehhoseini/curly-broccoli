const { Router } = require("express");

const router = Router();

router.post("/login", require('./login'));

module.exports = router;