const mongoose = require("mongoose");
const Post = require("../models/postModel");
const nodemailer = require("nodemailer");

// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Post
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create Post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      imageUrl: req.body.image,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id; // Extract post ID from request parameters
    const updates = req.body; // Extract updates from request body

    // Check if postId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    // Find the post by ID and update it
    const updatedPost = await Post.findByIdAndUpdate(postId, updates, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id; // Extract post ID from request parameters

    // Check if postId is not provided
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    // Check if postId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.contactEmail = async (req, res) => {
  const { name, email, message } = req.body;
  console.log(name, email, message);

  try {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: process.env.USER_EMAIL,
      subject: "New Contact Form Submission",
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
};
