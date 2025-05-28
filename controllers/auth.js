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
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid user or password" });
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token });
  
};
