const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
console.log("model class working fine");
console.log("yoho");
const userS = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }
});
userS.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
userS.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


module.exports = mongoose.model("User", userS);
