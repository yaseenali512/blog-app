const mongoose = require("mongoose");
const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserRole = async (req, res) => {
  try {
    // Retrieve user data based on authenticated user's ID
    const user = await User.findById(req.params.id);
    console.log(user);

    // If user is not found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is admin
    const isAdmin = user.role === "admin";

    // Return response based on user role
    res.json({ isAdmin });
  } catch (error) {
    console.error("Error checking user role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
