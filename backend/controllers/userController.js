const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/jwtFeature");
const dot = require("dotenv").config();
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  let myCloud;
  try {
    myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
  } catch (e) {
    console.log(e.message);
  }
  console.log(myCloud);
  if (!name || !email || !password) {
    return next({
      statusCode: 400,
      message: "missing credentials",
    });
  }
  try {
    const isExists = await User.exists({ email });
    if (isExists) {
      res.status(409).json({
        success: false,
        message: "User already registered",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });
      const accessToken = createAccessToken(
        { _id: user._id, email: user.email },
        process.env.SECRET_KEY,
        process.env.ACCESS_TOKEN_TIME
      );
      res.cookie("AccessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        accessToken,
        user,
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({
      statusCode: 400,
      message: "please enter email and password",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next({
      statusCode: 401,
      message: "please register first",
    });
  } else {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next({
        statusCode: 401,
        message: "password does not match",
      });
    } else {
      const accessToken = createAccessToken(
        { _id: user._id, email: user.email },
        process.env.SECRET_KEY,
        process.env.ACCESS_TOKEN_TIME
      );
      res.cookie("AccessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        token: accessToken,
        user,
      });
    }
  }
};

exports.logoutUser = async (req, res, next) => {
  res.clearCookie("AccessToken");
  res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
};

exports.forgetPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next({
      statusCode: 404,
      message: "user not found",
    });
  } else {
    const resetToken = user.getPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordURL = `${req.protocol}://${req.get(
      "host"
    )}/Users/reset/${resetToken}`;

    const message = `Your password reset token is : \n\n ${resetPasswordURL} \n\nIf you have not requested this email than please ignore it`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Ecommerce Password recovery",
        message: message,
      });
      res.status(200).json({
        success: true,
        message: "email sent successfully",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      user.save({ validateBeforeSave: false });
      return next({
        statusCode: 500,
        message: error.message,
      });
    }
  }
};

exports.resetPassword = async (req, res, next) => {
  const token = req.params.token;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next({
      statusCode: 404,
      message: "invalid token or token expire",
    });
  }
  if (req.body.password != req.body.confirmPassword) {
    return next({
      statusCode: 400,
      message: "password does not match",
    });
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    user.password = hashedPassword;
    await user.save({ validateBeforeSave: false });
    const accessToken = createAccessToken(
      { _id: user._id, email: user.email },
      process.env.SECRET_KEY,
      process.env.ACCESS_TOKEN_TIME
    );
    res.cookie("AccessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      token: accessToken,
      user,
    });
  }
};

exports.getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
};

exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatched) {
    return next({
      statusCode: 400,
      message: "old password does not match",
    });
  } else if (newPassword !== confirmPassword) {
    return next({
      statusCode: 400,
      message: "password does not match",
    });
  } else {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  let data = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== "") {
    try {
      const user = await User.findById(req.user.id);

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      data.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    } catch (e) {
      return next({ error: e.message });
    }
  }
  await User.findByIdAndUpdate(req.user._id, data);
  res.status(200).json({
    success: true,
    message: "profile updated successfully",
  });
};

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
};

exports.getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next({
      statusCode: 404,
      message: "user not found",
    });
  }
  res.status(200).json({
    success: true,
    user,
  });
};

exports.updateUser = async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "user updated successfully",
  });
};

exports.deleteUser = async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "user deleted successfully",
  });
};
