const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();
console.log("app.js working fine");
console.log("yoho");

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true,})
.then(() => console.log("MongoDB is successfully connected"))
.catch(err => console.error("MongoDB has error", err));
app.use("/api/events", require("./routes/event"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/bookings", require("./routes/book"));



module.exports = app;
