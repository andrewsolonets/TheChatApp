const User = require("../models/userModel");
const utils = require("../utils/token");

const bcrypt = require("bcrypt");

module.exports.userToken = async (req, res, next) => {
  try {
    const username = req.user.username;
    const user = await User.findOne({ username });
    console.log({ req });
    res.status(200).json({
      message: "success",
      user: user,
    });
  } catch (err) {}
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const token = utils.getToken(username);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: Number(process.env.TOKEN_EXPIRES_IN) * 1000, //convert 2h to ms; maxAge uses miliseconds
    });
    delete user.password;
    return res.json({ status: true, user, token });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = utils.getToken(username);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: Number(process.env.TOKEN_EXPIRES_IN) * 1000, //convert 2h to ms; maxAge uses miliseconds
    });

    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
