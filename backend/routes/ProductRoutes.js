const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/ProductController");
const { authentication } = require("../middlewares/auth");
const { checkAdmin } = require("../middlewares/admin");
const router = express.Router();

//create --admin
router.route("/new").post(authentication, checkAdmin, createProduct);
//all
router.route("/all").get(getAllProducts);
//update  --admin
router.route("/update/:id").put(authentication, checkAdmin, updateProduct);
//delete --admin
router.route("/delete/:id").delete(authentication, checkAdmin, deleteProduct);
//get single
router.route("/getSingle/:id").get(/* authentication,*/ getSingleProduct);
router.route("/createReview").post(authentication, createProductReview);
router.route("/getProductReviews").get(getProductReviews);
router.route("/deleteReview").delete(authentication, deleteReview);

module.exports = router;
