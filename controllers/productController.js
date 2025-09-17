import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      originalPrice,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      sizeChart,
      careInstructions,
    } = req.body;

    const adminId = req.user._id;

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      originalPrice,
      price,
      subCategory,
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes),
      sizeChart: sizeChart ? JSON.parse(sizeChart) : [],
      careInstructions: careInstructions ? JSON.parse(careInstructions) : [],
      image: imagesUrl,
      date: Date.now(),
      adminId,
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// List Products
export const listProducts = async (req, res) => {
  try {
    let adminId;
    if (req.user?._id) {
      adminId = req.user._id; // From verified token
    } else if (req.query.adminId) {
      adminId = req.query.adminId; // From frontend query
    } else {
      return res.status(400).json({
        success: false,
        message: "Admin ID is required",
      });
    }
    console.log("🔐 listProducts req.user:", req.user);

    const products = await productModel.find({ adminId });

    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Remove Product
export const removeProduct = async (req, res) => {
  try {
    await productModel.findOneAndDelete({
      _id: req.body.id,
      adminId: req.user._id,
    });
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      description,
      originalPrice,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      sizeChart,
      careInstructions,
    } = req.body;

    const updateFields = {
      name,
      description,
      category,
      originalPrice,
      price,
      subCategory,
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes),
      sizeChart: sizeChart ? JSON.parse(sizeChart) : [],
      careInstructions: careInstructions ? JSON.parse(careInstructions) : [],
    };

    const images = [
      req.files.image1?.[0],
      req.files.image2?.[0],
      req.files.image3?.[0],
      req.files.image4?.[0],
    ].filter(Boolean);

    if (images.length > 0) {
      const imagesUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
      updateFields.image = imagesUrl;
    }

    await productModel.findOneAndUpdate(
      { _id: productId, adminId: req.user._id },
      updateFields
    );

    res.json({ success: true, message: "Product Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Single Product
export const singleProduct = async (req, res) => {
  try {
    let adminId;
    if (req.user?._id) {
      adminId = req.user._id; // From verified token
    } else if (req.query.adminId) {
      adminId = req.query.adminId; // From frontend query
    } else {
      return res.status(400).json({
        success: false,
        message: "Admin ID is required",
      });
    }

    console.log("🔐 singleProduct req.user:", req.user);
    const { productId } = req.body;
    const product = await productModel.findOne({
      _id: productId,
      adminId,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
