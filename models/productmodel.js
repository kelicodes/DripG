import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    shoeName: {
      type: String,
      required: [true, "Shoe name is required"],
      trim: true,
    },

    desc: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    images: [
      {
        type: Array,
        required: true,
      },
    ],

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      lowercase: true,
    },

    shoeNumbers: [
      {
        type: Array,
        required: true,
      },
    ],
    brand:{
      type:String,
      
    },
    color:{
      type:Array,

    },
    isAvailable: {
      type: Boolean,
      default: true, // 👈 available by default
    },
    price: {
      type: Number,
      required:true
    },
    discountPrice: {
      type:Number
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
