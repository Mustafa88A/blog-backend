const express = require("express");
const router = express.Router();
const {
  getAllComment,
  // getCommentById,
  createComment,
  deleteComment,
  updateComment,
  getAllCommentsByBlogId,
} = require("../controllers/comments");
const { authenticateToken } = require("../middleware/auth");

router.get("/", getAllComment);
// router.get("/:id", getCommentById);
router.get("/:id", getAllCommentsByBlogId);

router.post("/", authenticateToken, createComment);
router.delete("/:id", deleteComment);
router.put("/:id", updateComment);

module.exports = router;
