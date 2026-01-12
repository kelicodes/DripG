import jwt from "jsonwebtoken";

const Auth = (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ get token from cookies

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login required"
      });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);

    req.user = { id: decoded.id }; // ✅ store user ID in request
    next(); // continue to the next middleware/controller
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ // ❌ use 401 for auth issues
      success: false,
      message: "Invalid or expired token. Please log in again."
    });
  }
};

export default Auth;
