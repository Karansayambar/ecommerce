import mongoose from "mongoose";

const DB_URL =
  "mongodb+srv://:@cluster0.zp5hd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(DB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
