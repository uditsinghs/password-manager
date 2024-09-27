import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const URL =
      process.env.MONGO_URL || " mongodb://localhost:27017/passwordManager";
    await mongoose.connect(URL, {
      useNewUrlParser: true,
    });
    console.log("connected to mongoDb");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
