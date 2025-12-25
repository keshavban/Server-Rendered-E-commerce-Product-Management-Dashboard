import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
  console.log("🔌 connectDB() called");

  if (!MONGODB_URI) {
    console.log("❌ MONGODB_URI is undefined");
    throw new Error("Please define MONGODB_URI in .env.local");
  }

  console.log("📡 Connecting to MongoDB...");
  console.log("URI:", MONGODB_URI);

  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected to DB:", conn.connection.name);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
}
