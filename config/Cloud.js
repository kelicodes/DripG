import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

if (
  !process.env.CLOUDNAME ||
  !process.env.CLOUDKEY ||
  !process.env.CLOUDSECRET
) {
  throw new Error("❌ Cloudinary env variables are missing");
}

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDKEY,
  api_secret: process.env.CLOUDSECRET,
});

export default cloudinary;
