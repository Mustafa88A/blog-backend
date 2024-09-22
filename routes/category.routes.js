const express = require("express");
const router = express.Router();

const {
  getAllCategory,
  getOneCategory,
  newCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category.controller");
const { fileUpload } = require("../middleware/uploads");
// const { authenticateToken } = require("../middleware/auth");
router.get("/", getAllCategory);
router.get("/:categoryId", getOneCategory);


router.post("/", fileUpload.single("image"), newCategory);



// router.post("/", newCategory);
router.delete("/:categoryId", deleteCategory);
router.put("/:categoryId", updateCategory);

module.exports = router;
