const category = require("../models/CategorySchema");

const getAllCategory = async (req, res, next) => {
  try {
    const getCategory = await category.find();
    res.status(200).json(getCategory);
  } catch (error) {
    next(error);
  }
};

const getOneCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getCategory = await category.findOne({ _id: id }).populate("post");
    res.status(201).json(getCategory);
  } catch (error) {
    next(error);
  }
};

const newCategory = async (req, res, next) => {
  try {
    const imageFile = req.file;
    if (!imageFile) {
      throw new Error("image file not found");
    }
    const imageUrl = "images/" + imageFile.filename;
    const categoryNew = await category.create({
      ...req.body,
      image: imageUrl,
    });
    res.status(201).json(categoryNew);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const categoryDelete = await category.findByIdAndDelete({
      _id: categoryId,
    });
    res.status(201).json("deleted is done ", categoryDelete);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const CategoryUpdate = await category.updateOne(
      { _id: categoryId },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json(CategoryUpdate);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategory,
  getOneCategory,
  newCategory,
  deleteCategory,
  updateCategory,
};
