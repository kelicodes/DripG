import express from "express";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import { DB } from "./config/Db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import cartRouter from "./routes/cartRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

console.log("🔥 Server starting...");

// ---------- CORS Setup ----------
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "https://dripg.onrender.com","https://dripjunk.vercel.app/"]; // your React dev server

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman or server-to-server requests
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // allow cookies if needed
  })
);

app.use(cookieParser())

// ---------- Middleware ----------
app.use(express.json()); // parse JSON bodies
DB(); // connect to database

// ---------- Routes ----------
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart",cartRouter)


// ---------- Test Route ----------
app.get("/", (req, res) => {
  res.send("API running");
});

// ---------- Start Server ----------
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
