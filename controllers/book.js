const Booking = require("../models/book");
const Event = require("../models/event");
console.log("book working fine");
console.log("yoho");
exports.bookEvent = async (req, res) => {
    const userId = req.user.id;
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });    
    if (event.availableSeats <= 0) {
      return res.status(400).json({ message: "No available seats" });
    }   
    const existingBooking = await Booking.findOne({ user: userId, event: eventId });
    if (existingBooking) {
      return res.status(400).json({ message: "You already booked this event" });
    }   
    const booking = new Booking({ user: userId, event: eventId });
    await booking.save();   
    event.availableSeats -= 1;
    await event.save(); 
    res.status(201).json(booking);
};
exports.getMyBookings = async (req, res) => {
    const bookings = await Booking.find({ user: req.user.id }).populate("event");
    res.json(bookings);
};
exports.cancelBooking = async (req, res) => {
    const booking = await Booking.findOneAndDelete({
      _id: req.params.bookingId,
      user: req.user.id
    });
    if (!booking) return res.status(404).json({ message: "not found" });
    const event = await Event.findById(booking.event);
    if (event) {
      event.availableSeats += 1;
      await event.save();
    }
    res.json({ message: "canceled" });
};



