const jwt = require("jsonwebtoken");
console.log("auth.js working fine");
console.log("yoho");
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};
exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid" });
  }
};


