const { Router } = require("express");
const { Authorization } = require("../../../utils/authorization");
const { ROLES } = require("../../../constants/Auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").at(-1),
    );
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.get("/", require("./getAll"));

router.post(
  "/",
  Authorization([ROLES.Admin]),
  upload.single("productPhoto"),
  require("./add"),
);

router.post(
  "/",
  Authorization([ROLES.Admin]),
  upload.single("productPhoto"),
  require("./edit"),
);

router.post(
  "/remind-me",
  Authorization([ROLES.User]),
  require("./remindMe.js"),
);

router.post("/edit-price", Authorization([ROLES.Admin]), require("./editPrice"));


module.exports = router;
