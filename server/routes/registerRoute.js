const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

router.post("/", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    console.log("req bod___________: ", req.body);

    // 1. Basic Validation
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Please provide both username, email and password " });
    }

    // 2. Check for Existing User
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // 3. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create New User
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    const savedUser = await newUser.save(); // Store the result
    console.log(savedUser);

    // 5. Success Response
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (err) {
    console.error("User Creation Error:", err); // More detailed logging
    res.status(500).json({ message: "Error creating user" }); // Simplified frontend message
  }
});

module.exports = router;
