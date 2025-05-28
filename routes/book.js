const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const controller = require("../controllers/book");
console.log("book class working fine");
console.log("yoho");

router.post("/:eventId", authenticate, controller.bookEvent);
router.get("/", authenticate, controller.getMyBookings);
router.delete("/:bookingId", authenticate, controller.cancelBooking);

module.exports = router;
