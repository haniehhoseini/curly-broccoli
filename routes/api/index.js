const { Router } = require("express");

const router = Router();

router.use("/user", require("./user"));
router.use("/auth", require("./auth"));
router.use("/product", require("./product"));
router.use("/cart", require("./cart"));
router.use("/order", require("./order"));
router.use("/analytic", require("./analytic"));

module.exports = router;
