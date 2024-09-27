import mongoose from "mongoose";
const passwordSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const Password = mongoose.model("Password", passwordSchema);
