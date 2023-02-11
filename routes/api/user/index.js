const { Router } = require("express");
const multer = require("multer");
const { Authorization } = require("../../../utils/authorization");
const { ROLES } = require("../../../constants/Auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/users");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + '.' + file.originalname.split(".").at(-1),
    );
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.put(
  "/profile",
  Authorization([ROLES.Admin, ROLES.User]),
  upload.single("profilePhoto"),
  require("./profile"),
);

router.post("/add-category", Authorization([ROLES.User]), require("./addCategory"));
router.post(
  "/edit-category",
  Authorization([ROLES.User]),
  require("./editCategory"),
);
router.delete(
  "/delete-category",
  Authorization([ROLES.User]),
  require("./deleteCategory"),
);


module.exports = router;
