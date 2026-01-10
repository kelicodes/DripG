import Product from "../models/productmodel.js";
import cloudinary from "../config/Cloud.js";
import fs from "fs";
import mongoose from "mongoose";

// ===== Upload product =====
export const productUpload = async (req, res) => {
  try {
    const {
      shoeName,
      desc,
      category,
      shoeNumbers,
      brand,
      color,
      price,
      discountPrice,
      isAvailable,
    } = req.body;

    if (!shoeName || !desc || !category || !shoeNumbers || !price) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const parsedShoeNumbers = Array.isArray(shoeNumbers)
      ? shoeNumbers.map(Number)
      : shoeNumbers.split(",").map(n => Number(n.trim()));

    const uploadedImages = [];

    for (const key of ["image1", "image2", "image3", "image4"]) {
      if (req.files?.[key]?.[0]) {
        const filePath = req.files[key][0].path;

        const result = await cloudinary.uploader.upload(filePath, {
          folder: "products",
        });

        uploadedImages.push(result.secure_url);
        fs.unlinkSync(filePath);
      }
    }

    if (uploadedImages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const product = await Product.create({
      shoeName,
      desc,
      category,
      brand,
      color,
      shoeNumbers: parsedShoeNumbers,
      images: uploadedImages,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      isAvailable: isAvailable ?? true,
    });

    res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Product upload failed",
      error: error.message,
    });
  }
};
