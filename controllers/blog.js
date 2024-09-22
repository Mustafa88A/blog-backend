const post = require("../models/PostSchema");

async function getAllBlog(req, res, next) {
  try {
    const getBlog = await post
      .find()
      .populate("user", "userName")
      .populate("category", "name");

    res.status(201).json(getBlog);
    console.log(getBlog);
  } catch (error) {
    next(error);
  }
}

async function getAllUserByBlog(req, res, next) {
  try {
    const { userId } = req.body;
    const users = await post
      .find()
      .where("user")
      .all(userId)
      .populate(["user", "comments"]);
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
}

async function getBlogById(req, res, next) {
  try {
    const id = req.params.id;
    const blogById = await post
      .findById(id)
      .populate("user", "userName fullName");
    // .populate("comments", "comment");
    res.status(201).json(blogById);
  } catch (error) {
    next(error);
  }
}
async function getBlogByCategory(req, res, next) {
  try {
    const id = req.body.id;
    const blogByCategory = await post.find({ category: id });
    // .populate("user", "userName fullName");
    // .populate("comments", "comment");
    res.status(201).json(blogByCategory);
  } catch (error) {
    next(error);
  }
}

async function createPostBlog(req, res, next) {
  try {
    console.log(req.body);
    const imageFile = req.file;
    if (!imageFile) {
      throw new Error("image file not found");
    }
    const imageUrl = "images/" + imageFile.filename;
    const newBlog = await post.create({
      ...req.body,
      user: req.user.id,
      image: imageUrl,
    });
    res.status(200).json(newBlog);
  } catch (error) {
    next(error);
  }
}

async function deletePostBlog(req, res, next) {
  try {
    const { id } = req.params;
    await post.findByIdAndDelete(id);

    res.status(201).json("delete done ");
  } catch (error) {
    next(error);
  }
}

async function updatePostBlog(req, res, next) {
  try {
    const idBlog = req.params.id;
    const updatePostData = req.body;
    console.log("id", idBlog);
    console.log("update", updatePostData);

    const foundPost = await post.findByIdAndUpdate(idBlog, updatePostData, {
      new: true,
    });
    if (!foundPost) {
      return res.status(400).json({
        message: `Oops, it seems like the post you're looking for is not there`,
      });
    }
    return res.status(200).json({ UpdatePost: foundPost });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllBlog,
  getAllUserByBlog,
  getBlogById,
  createPostBlog,
  deletePostBlog,
  updatePostBlog,
  getBlogByCategory,
};
