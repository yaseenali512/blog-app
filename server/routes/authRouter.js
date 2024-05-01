const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// Login route
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Basic Validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both username and password" });
    }

    // 2. Find the User
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    console.log(username, password, user.password);

    // 3. Compare Passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // 4. Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "90d",
    });

    // 5. Send Token in Response
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
