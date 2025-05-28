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
  const a = req.headers.authorization?.split(" ")[1];
  if (!a) return res.status(401).json({ message: "No token" });
  try {
    const b = jwt.verify(token, process.env.JWT_SECRET);req.user = b;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid" });
  }
};


