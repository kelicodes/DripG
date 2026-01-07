import productmodel from "../models/productmodel.js";
import cloudinary from "../Config/Cloud.js";
import fs from "fs";
import mongoose from "mongoose";




// ======= Upload a new product =======
export const productUpload = async (req, res) => {
  try {
    const { shoeName, desc, category, shoeNumbers, isAvailable, brand, color, price, discountPrice } = req.body;

    if (!shoeName || !desc || !category || !shoeNumbers || !price) {
      return res.status(400).json({
        success: false,
        message: "shoeName, desc, category, shoeNumbers, and price are required",
      });
    }

    const parsedShoeNumbers = Array.isArray(shoeNumbers)
      ? shoeNumbers.map(Number)
      : shoeNumbers.split(",").map((n) => Number(n.trim()));

    const uploadedImages = [];

    for (const key of ["image1", "image2", "image3", "image4"]) {
      if (req.files?.[key]?.[0]) {
        const filePath = req.files[key][0].path;

        const result = await cloudinary.uploader.upload(filePath, { folder: "products" });
        uploadedImages.push(result.secure_url);
        fs.unlinkSync(filePath);
      }
    }

    if (uploadedImages.length < 1) {
      return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    const newProduct = new productmodel({
      shoeName,
      desc,
      category,
      brand,
      color,
      shoeNumbers: parsedShoeNumbers,
      images: uploadedImages,
      isAvailable: isAvailable ?? true,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Product upload failed",
      error: error.message,
    });
  }
};



// ======= Fetch all products =======
export const fetchProducts = async (req, res) => {
  try {
    const products = await productmodel.find({});
    return res.json({
      success: true,
      message: "Products fetched",
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Fetch products failed",
    });
  }
};


// ======= Fetch single product =======
export const fetchProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    const product = await productmodel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      message: "Product fetched",
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Fetch product failed",
    });
  }
};


// ======= Remove product =======
export const removeProduct = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    await productmodel.findByIdAndDelete(itemId);

    return res.json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Remove product failed",
    });
  }
};


// ======= Fetch products by category =======
export const fetchProductsByCategory = async (req, res) => {
  try {
    const { cat } = req.params;

    if (!cat) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const products = await productmodel.find({
      category: { $regex: new RegExp(cat, "i") },
      isAvailable: true,
    });

    return res.json({
      success: true,
      message: "Products fetched by category",
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Fetch by category failed",
      error: error.message,
    });
  }
};
