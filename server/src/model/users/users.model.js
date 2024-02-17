import bcrypt from "bcrypt";
import User from "./users.mongo.js";

const createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10).catch((error) => {
    throw new Error("Error hashing password: " + error.message);
  });

  const user = new User({ username, password: hashedPassword });

  try {
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

const findUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    throw new Error("Error finding user by username: " + error.message);
  }
};

export async function setupAdminAccount() {
  try {
    const admin = await User.findOne({ username: process.env.ADMIN_USERNAME });
    if (!admin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        username: process.env.ADMIN_USERNAME,
        password: hashedPassword,
      });
      console.log("Admin account created");
    }
  } catch (error) {
    console.error("Error setting up admin account:", error);
    throw new Error("Internal server error");
  }
}

export default { createUser, findUserByUsername }; // Export functions individually
