import express from "express";
import upload from "../middleware/multer.js";// Cloudinary middleware
import {productUpload, fetchProduct,fetchProducts,fetchProductsByCategory,removeProduct } from "../Controller/myProductcont.js"

const productRouter = express.Router();

// ------------------ Routes ------------------

// Upload product images
productRouter.post(
  "/upload",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  productUpload
);

// Fetch a single product
productRouter.get("/fetch", fetchProduct);

// Fetch all products
productRouter.get("/fetch", fetchProducts);

// Delete a product
productRouter.delete("/remove", removeProduct);

// Fetch products by category
productRouter.get("/category/:cat", fetchProductsByCategory);

export default productRouter;
