import mongoose from "mongoose";

export const DB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
