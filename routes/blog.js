const express = require("express");
const router = express.Router();
const {
  getAllBlog,
  getBlogById,
  createPostBlog,
  deletePostBlog,
  updatePostBlog,
  getAllUserByBlog,
  getBlogByCategory,
} = require("../controllers/blog");
const { fileUpload } = require("../middleware/uploads");
const { authenticateToken } = require("../middleware/auth");
router.get("/", getAllBlog);
router.get("/:id", getBlogById);
router.post("/category", getBlogByCategory);

// router.post("/", );
router.post("/", authenticateToken, fileUpload.single("image"), createPostBlog);

router.post("/user", getAllUserByBlog);
router.delete("/:id", deletePostBlog);
router.put("/:id", updatePostBlog);

module.exports = router;
