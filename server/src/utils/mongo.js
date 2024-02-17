import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("MONGO_URL is not defined");
}

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

export async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {});
}
