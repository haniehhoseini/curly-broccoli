const { Router } = require("express");

const router = Router();

router.get("/ping", (req, res) => {
  return res.json({ message: "pong" });
});

module.exports = router;
