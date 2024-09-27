import express from "express";
const app = express();
import { connectDB } from "./src/config/connectDB.js";
import passwordRoute from "../Backend/src/routes/password.route.js";
import cors from 'cors'
// dotenv configutation
import dotenv from "dotenv";
dotenv.config();
app.use(express.json())
app.use(cors())
app.use("/api/v1/password", passwordRoute);
const PORT = process.env.PORT || 3000;
connectDB();
app.listen(PORT, () => {
  console.log(`Server is listen port ${PORT}`);
});
