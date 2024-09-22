const express = require("express");
const router = express.Router();
const {
  getAllUser,
  signUp,
  login,
  deleteUser,
} = require("../controllers/userControl");
const { authenticateUser } = require("../middleware/auth");
const { fileUpload } = require("../middleware/uploads");

router.get("/", getAllUser);

// router.post("/signup", fileUpload.single("image"), signUp);
router.post("/signup", fileUpload.single("image"), signUp);

router.post("/login", authenticateUser, login);

router.delete("/:id", deleteUser);
module.exports = router;
