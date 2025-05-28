const Event = require("../models/event");
console.log("event working fine");
console.log("yoho");
exports.createEvent = async (req, res) => {
    const { title, description, dateTime, location, totalSeats } = req.body;
    const event = new Event({title,description,dateTime,location,totalSeats,availableSeats: totalSeats});
    await event.save();
    res.status(201).json(event);
};exports.getAllEvents = async (req, res) => {
        const a = await Event.find();
        res.json(a);
};
exports.deleteEvent = async (req, res) => {
    const a = await Event.findByIdAndDelete(req.params.id);
    if (!a) return res.status(404).json({ message: "not found" });
    res.json({ message: "Event deleted" });
};
exports.updateEvent = async (req, res) => {
    const a = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!a) return res.status(404).json({ message: "not found" });
    res.json(a);
};

