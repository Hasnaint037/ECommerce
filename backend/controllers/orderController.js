const Order = require("../models/orderModel");
const Product = require("../models/ProductModel");

exports.newOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  });
};

exports.getSingleOrder = async (req, res, next) => {
  const order = await Order.findOne({ _id: req.params.id }).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next({
      statusCode: 404,
      message: "order not found with this id",
    });
  } else {
    res.status(200).json({
      success: true,
      order,
    });
  }
};

exports.getMyOrder = async (req, res, next) => {
  const myOrder = await Order.find({ user: req.user._id });
  if (!myOrder) {
    return next({
      statusCode: 404,
      message: "you don't have any order yet",
    });
  } else {
    res.status(200).json({
      success: true,
      myOrder,
    });
  }
};

exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    orders,
    totalAmount,
    success: true,
  });
};

exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next({
      statusCode: 404,
      message: "order not found",
    });
  }
  if (order.orderStatus === "Delivered") {
    return next({
      statusCode: 400,
      message: "You have delivered this order",
    });
  } else {
    if (req.body.status == "Delivered") {
      order.orderItems.forEach(async (ord) => {
        await updateStock(ord.product, ord.quantity);
      });
      order.orderStatus = req.body.status;
      order.deliveredAt = Date.now();
      await order.save({ validateBeforeSave: false });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  }
};

async function updateStock(product, quantity) {
  const products = await Product.findOne({ _id: product });
  console.log(products);
  products.stock -= quantity;
  await products.save({ validateBeforeSave: false });
}

exports.deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next({
      statusCode: 404,
      message: "order not found",
    });
  } else {
    await Order.findByIdAndDelete(order._id);
    res.status(200).json({
      success: true,
      order,
    });
  }
};
