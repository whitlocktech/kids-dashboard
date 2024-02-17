// auth.controller.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../../model/users/users.mongo.js";

dotenv.config();

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }); // Ensure User model is imported correctly
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If username and password are correct, create token and send response
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("auth", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  // Clear cookie
  res.clearCookie("auth");

  // Respond with success message
  res.status(200).json({ message: "Logout successful" });
};

export { login, logout };
