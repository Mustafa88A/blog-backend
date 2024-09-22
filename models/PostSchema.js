const { model, Schema } = require("mongoose");
const postSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  introduction: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "category is required"],
  },
});

const post = model("post", postSchema);
module.exports = post;
