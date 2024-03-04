const User = require("../models/userModel");
const { verifyAccessToken } = require("../utils/jwtFeature");
const dot = require("dotenv").config();

exports.authentication = async (req, res, next) => {
  const { AccessToken } = req.cookies;
  if (!AccessToken) {
    return next({
      statusCode: 400,
      message: "please login first",
    });
  } else {
    const _id = verifyAccessToken(AccessToken, process.env.SECRET_KEY);
    const user = await User.findById({ _id });
    if (user) {
      req.user = user;
      return next();
    } else {
      return next({
        statusCode: 401,
        message: "unauthorized user",
      });
    }
  }
};
