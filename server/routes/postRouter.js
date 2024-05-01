const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware"); // Placeholder for authentication
const { route } = require("./registerRoute");

// GET /posts
router.get("/", postController.getAllPosts);

// GET /posts/:id
router.get("/:id", postController.getPostById);

// POST /posts
router.post("/", authMiddleware, postController.createPost);

// PUT /posts/:id
router.put("/:id", authMiddleware, postController.updatePost);

// DELETE /posts/:id
router.delete("/:id", authMiddleware, postController.deletePost);

router.post("/", postController.contactEmail);

module.exports = router;
