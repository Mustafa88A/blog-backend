const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function generatedToken(user) {
  const payload = {
    id: user._id,
    fullName: user.fullName,
    userName: user.userName,
    email: user.email,
    image: user.image,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY);

  return token;
}

exports.getAllUser = async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json(allUser);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const id = req.params;
    const oneUser = User.findById(id);
    res.status(201).json(oneUser);
  } catch (error) {
    next(error);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;

    const imageFile = req.file;
    if (!imageFile) {
      throw new Error("image file not found");
    }
    const imageUrl = "images/" + imageFile.filename;

    // console.log(req.body);
    const newUserData = {
      ...req.body,
      image: imageUrl,
    };
    console.log(req.body, "body");

    // const addUser = await User.create(req.body);
    const addUser = await User.create(newUserData);

    const generateToken = generatedToken(addUser);
    res.status(201).json({ generateToken });
    console.log(addUser, "878778");
    console.log(generateToken, "555555");
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = req.user;
    console.log("back", user);

    const generateToken = generatedToken(user);
    res.status(201).json({ generateToken });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(201).json("delete user done");
  } catch (error) {
    next(error);
  }
};
