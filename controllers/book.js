const Booking = require("../models/book");
const Event = require("../models/event");
console.log("book working fine");
console.log("yoho");
exports.bookEvent = async (req, res) => {
    const userId = req.user.id;
    const eventId = req.params.eventId;
    const a = await Event.findById(eventId);
    if (!a) return res.status(404).json({ message: "Event not found" });    
    if (a.availableSeats <= 0) {
      return res.status(400).json({ message: "No available seats" });
    }   
    const exb = await Booking.findOne({ user: userId, event: eventId });
    if (exb) {
      return res.status(400).json({ message: "You already booked this event" });
    }   
    const bk = new Booking({ user: userId, event: eventId });
    await bk.save();   
    a.availableSeats -= 1;
    await a.save(); 
    res.status(201).json(bk);
};
exports.getMyBookings = async (req, res) => {
    const bk = await Booking.find({ user: req.user.id }).populate("event");
    res.json(bk);
};
exports.cancelBooking = async (req, res) => {
    const bk = await Booking.findOneAndDelete({
      _id: req.params.bookingId,
      user: req.user.id
    });
    if (!bk) return res.status(404).json({ message: "not found" });
    const a = await Event.findById(booking.event);
    if (a) {
      a.availableSeats += 1;
      await a.save();
    }
    res.json({ message: "canceled" });
};



