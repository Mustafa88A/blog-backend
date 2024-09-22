const { Schema, model } = require("mongoose");

// Category Schema
const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  // post: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "post",
  //   },
  // ],
});

const Category = model("Category", categorySchema);
module.exports = Category;
