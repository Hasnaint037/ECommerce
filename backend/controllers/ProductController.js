const Product = require("../models/ProductModel");
const ApiFeature = require("../utils/apiFeature");

exports.createProduct = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getAllProducts = async (req, res, next) => {
  const count = 8;
  const productsCount = await Product.countDocuments();
  try {
    let APIFeature = new ApiFeature(Product, req.query);
    APIFeature = APIFeature.search().filter().pagination(count);
    const product = await APIFeature.query;
    res.status(200).json({
      success: true,
      product,
      productsCount,
      count,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    return next({
      statusCode: 404,
      error: "product not found",
    });
  } else {
    product = await Product.findOneAndUpdate(
      { _id: product._id },
      { $set: { ...req.body } },
      { upsert: true }
    );
    res.status(200).json({ success: true, product });
  }
};

exports.deleteProduct = async (req, res, next) => {
  let product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    return next({
      statusCode: 404,
      message: "product not found",
    });
  } else {
    product = await Product.findOneAndDelete({ _id: product._id });
    res
      .status(200)
      .json({ success: true, message: "product deleted successfully" });
  }
};

exports.getSingleProduct = async (req, res, next) => {
  let product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    return next({
      statusCode: 404,
      error: "product not found",
    });
  }
  res.status(200).json({ success: true, product });
};

exports.createProductReview = async (req, res, next) => {
  const user = req.user;
  const { rating, comment, productId } = req.body;
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (res) => res.user.toString() == user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === user._id.toString()) {
        (rev.rating = Number(rating)), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push({
      comment,
      rating,
      name: user.name,
      user: user._id,
    });
    product.numberOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = avg / product.reviews.length;
  product.ratings = ratings;
  await product.save({ validateBeforeSave: false });
  res.status(201).json({
    success: true,
    message: "review added successfully",
  });
};

exports.getProductReviews = async (req, res, next) => {
  const product = await Product.findOne({ _id: req.query.productId });
  if (!product) {
    return next({
      statusCode: 404,
      message: "product not found",
    });
  } else {
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  }
};

exports.deleteReview = async (req, res, next) => {
  const product = await Product.findOne({ _id: req.query.productId });
  if (!product) {
    return next({
      statusCode: 404,
      message: "product not found",
    });
  } else {
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
    let avg = 0;
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
    const ratings = avg / reviews.length;
    product.ratings = ratings;
    product.reviews = reviews;
    product.ratings = reviews.length;
    product.numberOfReviews = product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  }
};
