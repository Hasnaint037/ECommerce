const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "please enter product description"],
    },
    price: {
      type: Number,
      required: [true, "please enter product price"],
      maxLength: [8, "price does not exceed 8 characters"],
    },
    ratings: { type: Number, default: 0 },
    image: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: { type: String, required: [true, "please enter category"] },
    stock: {
      type: Number,
      required: [true, "please enter product stock"],
      maxLength: [4, "stock can not exceed 4 characters"],
      default: 1,
    },
    numberOfReviews: { type: Number, default: 0 },
    reviews: [
      {
        user: {
          type: mongoose.SchemaTypes.ObjectId,
          required: true,
        },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema, "products");
