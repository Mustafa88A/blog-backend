const { model, Schema } = require("mongoose");
const userSchema = new Schema({
  fullName: {
    type: String,
  },
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    match: /^\S+@\S+\.\S+$/,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 4,
    mix: 16,
  },
  image: {
    type: String,
  },
});

const User = model("user", userSchema);
module.exports = User;
