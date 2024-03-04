const express = require("express");
const {
  newOrder,
  getSingleOrder,
  getMyOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { authentication } = require("../middlewares/auth");
const { checkAdmin } = require("../middlewares/admin");
const router = express.Router();

router.route("/create").post(authentication, newOrder);
router.route("/getOne/:id").get(authentication, checkAdmin, getSingleOrder);
router.route("/myOrder").get(authentication, getMyOrder);
router.route("/orders").get(authentication, checkAdmin, getAllOrders);
router.route("/update/:id").put(authentication, checkAdmin, updateOrder);
router.route("/delete/:id").delete(authentication, checkAdmin, deleteOrder);

module.exports = router;
