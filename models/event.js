const mongoose = require("mongoose");
console.log("model class working fine");
console.log("yoho");
const eventS = new mongoose.Schema({


  title :{type: String, required: true},
  dateTime :{type: Date, required: true},
  location :{type: String, required: true},
  description :{type: String},
  totalSeats :{type: Number, required: true},
  availableSeats :{type: Number, required: true}

},
{ timestamps: true });



module.exports = mongoose.model("Event", eventS);
