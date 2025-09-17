import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import path from "path";
import { fileURLToPath } from "url";
import "./models/productModel.js";
import "./models/orderModel.js";
import "./models/categoryModel.js";
import "./models/footerModel.js";
import "./models/aboutUsModel.js";

// Required to use __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routers
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import modifyUiRouter from "./routes/modifyUiRoute.js";
import settingsRouter from "./routes/settingsRoutes.js";
import footerRouter from "./routes/footerRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import backgroundVideoRouter from "./routes/backgroundVideoRoute.js";
import carouselRouter from "./routes/carouselRoute.js";
import aboutUsRouter from "./routes/aboutUsRoute.js";
import qikinkRouter from "./routes/qikinkRoute.js";
import contactUsRouter from "./routes/contactUsRoute.js";
import checkSubscription from "./middleware/checkSubscription.js";
import subscriptionRouter from "./routes/subscriptionRoute.js";
import userAdminRouter from "./routes/userAdminRoute.js";
import filterRouter from "./routes/filterRoute.js";
// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();

connectCloudinary();

// Middlewares
app.use(express.json());
app.use(
  cors({ allowedHeaders: ["Content-Type", "Authorization", "token", "Token"] })
);

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/user-admin", userAdminRouter);
app.use("/api/product", productRouter, checkSubscription);
app.use("/api/cart", cartRouter, checkSubscription);
app.use("/api/order", orderRouter, checkSubscription);
app.use("/api/modify", modifyUiRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/footer", footerRouter);
app.use("/api/category", categoryRouter);
app.use("/api/review", reviewRouter);
app.use("/api/background_video", backgroundVideoRouter);
app.use("/api/carousel", carouselRouter);
app.use("/api/about", aboutUsRouter);
app.use("/api/qikink", qikinkRouter);
app.use("/api/contact", contactUsRouter);
app.use("/api/user/subscription", subscriptionRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api", filterRouter);

// Serve videos statically
app.use(
  "/uploads/videos",
  express.static(path.join(__dirname, "uploads/videos"))
);

// Default route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => console.log("Server started on PORT : " + port));
