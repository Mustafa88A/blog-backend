const { model, Schema } = require("mongoose");

const CommentsSchema = new Schema({
  comment: {
    type: String,
    required: [true, "comment is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    // required: [true, "user is required"],
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: "post",
    // required: [true, "blog is required"],
  },
});

const comment = model("comment", CommentsSchema);
module.exports = comment;
