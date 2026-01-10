import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    shoeName: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String], // ✅ FIXED
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    shoeNumbers: {
      type: [Number], // ✅ FIXED
      required: true,
    },

    brand: {
      type: String,
      trim: true,
    },

    color: {
      type: [String], // ✅ FIXED
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
