const mongoose = require("mongoose");
console.log("book class working fine");
console.log("yoho");
const bookS = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, 
        ref: "User", required: true },
  bookedAt: { type: Date, default: Date.now },
  event: { type: mongoose.Schema.Types.ObjectId, 
        ref: "Event", required: true },
});

module.exports = mongoose.model("Booking", bookS);
