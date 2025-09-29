import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config'

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Incoming Auth Header:", authHeader);  // DEBUG

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "No Token Provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);  // DEBUG

    const decoded = jwt.verify(token, process.env.accessTokenSecret);
    console.log("Decoded Token:", decoded);  // DEBUG

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(403).json({ message: "invalid or expired token" });
  }
};