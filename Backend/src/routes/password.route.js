import express from "express";
import {
  savePasswordController,
  getPasswordController,
  deletePasswordController,
  updatePasswordController
} from "../controllers/password.controller.js";
const router = express.Router();
router.post("/savepassword", savePasswordController);
router.get("/getpassword", getPasswordController);
router.delete("/deletepassword/:id", deletePasswordController);
router.put("/updatePassword/:id", updatePasswordController);
export default router;
