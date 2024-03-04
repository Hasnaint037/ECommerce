const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { authentication } = require("../middlewares/auth");
const { checkAdmin } = require("../middlewares/admin");
const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/forgot").post(forgetPassword);
router.route("/reset/:token").post(resetPassword);
router.route("/me").get(authentication, getUserDetails);
router.route("/updatePassword").put(authentication, updatePassword);
router.route("/updateProfile").put(authentication, updateProfile);
router.route("/getAllUsers").get(authentication, checkAdmin, getAllUsers);
router
  .route("/getSingleUser/:id")
  .get(authentication, checkAdmin, getSingleUser);
router.route("/updateUser/:id").put(authentication, checkAdmin, updateUser);
router.route("/deleteUser/:id").delete(authentication, checkAdmin, deleteUser);

module.exports = router;
