const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  // const token = authHeader && authHeader.split(" ")[1]; // Extract token (if exists)
  // const token = authHeader && authHeader.split(" ")[1]; // Extract token (if exists)
  const token = authHeader && authHeader.split(" ").slice(2).join(" "); // Extract token (if exists)

  // console.log("authHeader:   ", authHeader);
  // console.log("token:  ", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // console.log("secretkey:  ", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded payload: ", decoded); // Log the content
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
