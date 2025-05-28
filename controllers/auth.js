const User = require("../models/user");
const jwt = require("jsonwebtoken");
console.log("auth working fine");
console.log("yoho");
exports.signup = async (req, res) => {
    const { email, password, role } = req.body;
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: "User registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u || !(await u.comparePassword(password)))
      return res.status(401).json({ message: "Invalid user or password" });
    const a = jwt.sign(
      { id: u._id, email: u.email, role: u.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ a });
  
};
