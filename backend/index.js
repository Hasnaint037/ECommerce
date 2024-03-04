const express = require("express");
const app = express();
const dot = require("dotenv").config();
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/ProductRoutes");
const userRouter = require("./routes/UserRoutes");
const { dbConnection } = require("./config/database");
const { errorHandler } = require("./middlewares/ErrorHandler");
const orderRouter = require("./routes/OrderRoutes");
const cors = require("cors");
const cloudinary = require("cloudinary");
const body_parser = require("body-parser");
const uploader = require("express-fileupload");

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(body_parser.urlencoded({ extended: true }));
app.use(uploader());
app.use("/products", productRouter);
app.use("/Users", userRouter);
app.use("/Orders", orderRouter);
app.use(errorHandler);

dbConnection();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
app.listen(process.env.PORT, () => {
  console.log(`Backend is running on port ${process.env.PORT}`);
});
