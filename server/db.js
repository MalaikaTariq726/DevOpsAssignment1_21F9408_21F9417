import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connection = async () => {
  const mongoURI = process.env.MONGO_URI;

  try {
    await mongoose.connect(mongoURI);

    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

Connection();

