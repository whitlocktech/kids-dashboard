// auth.middleware.js

import bcrypt from "bcrypt";
import User from "../model/users/users.mongo.js";
import dotenv from "dotenv";

dotenv.config();

const authenticateUser = (req, res, next) => {
  const token = req.cookies.auth;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user information to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { authenticateUser };
