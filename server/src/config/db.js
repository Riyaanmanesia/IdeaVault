import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // to use .env file 

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.error("Error connecting to mongodb", error);
    process.exit(1); //exit with failure
  }
};
