const express = require("express");
const router = express.Router();
const controller = require("../controllers/event");
const { authenticate, isAdmin } = require("../middleware/auth");
router.get("/", controller.getAllEvents);
console.log("event class working fine");
console.log("yoho");

router.post("/", authenticate, isAdmin, controller.createEvent);
router.put("/:id", authenticate, isAdmin, controller.updateEvent);
router.delete("/:id", authenticate, isAdmin, controller.deleteEvent);

module.exports = router;
