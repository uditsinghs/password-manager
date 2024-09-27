import { Password } from "../models/password.model.js";

export const savePasswordController = async (req, res) => {
  console.log(req.body);
  try {
    const passwordData = await Password.create(req.body);
    res.status(201).json(passwordData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const getPasswordController = async (req, res) => {
  try {
    const passwordData = await Password.find();
    res.status(200).json(passwordData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error,
      success: false,
    });
  }
};

export const deletePasswordController = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the password entry by ID and delete it
    const deletedPassword = await Password.findByIdAndDelete(id);

    // If the document is not found
    if (!deletedPassword) {
      return res.status(404).json({ message: "Password entry not found" });
    }

    return res.status(200).json({ message: "Password entry deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const updatePasswordController = async (req, res) => {
  const { id } = req.params;
  const { siteName, username, password } = req.body;

  try {
    // Find the password entry by ID and update the fields
    const updatedPassword = await Password.findByIdAndUpdate(
      id, 
      { siteName, username, password }, 
      { new: true, runValidators: true }
    );

    // If the document is not found
    if (!updatedPassword) {
      return res.status(404).json({ message: "Password entry not found" });
    }

    return res.status(200).json(updatedPassword);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
