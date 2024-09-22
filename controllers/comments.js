const { models } = require("mongoose");
const comment = require("../models/CommentsSchema");

async function getAllComment(req, res, next) {
  try {
    const getComment = await comment.find().populate("user");
    res.status(201).json(getComment);
  } catch (error) {
    next(error);
  }
}

async function getCommentById(req, res, next) {
  try {
    const { id } = req.params;
    const commentById = await comment.findById(id);
    res.status(201).json(commentById);
  } catch (error) {
    next(error);
  }
}

async function createComment(req, res, next) {
  try {
    const com = req.body;
    console.log("com", com);
    const newComment = {
      ...com,
      user: req.user.id,
      // blog: req.body.blog,
    };
    // .populate(["blog", "user"])
    const addComment = await (
      await comment.create(newComment)
    ).populate(["blog", "user"]);
    console.log("new comment ", newComment);
    res.status(201).json(addComment);
  } catch (error) {
    next(error);
  }
}

async function deleteComment(req, res, next) {
  try {
    const { id } = req.params;
    await comment.findByIdAndDelete(id);
    res.status(201).json({ message: "delete comment" });
  } catch (error) {
    next(error);
  }
}

async function updateComment(req, res, next) {
  try {
    const idComment = req.params.id;
    const commentUpdate = req.body;
    const newUpdateComment = await comment.findByIdAndUpdate(
      idComment,
      commentUpdate
    );
    res.status(200).json({ newUpdateComment });
  } catch (error) {
    next(error);
  }
}

async function getAllCommentsByBlogId(req, res, next) {
  try {
    const blogId = req.params.id;

    const commentid = await Comments.find({ blog: blogId });

    res.status(201).json(commentid);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllComment,
  getCommentById,
  createComment,
  deleteComment,
  updateComment,
  getAllCommentsByBlogId,
};
