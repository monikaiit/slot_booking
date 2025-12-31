const express = require("express");
const Slot = require("../models/Slot");
const Booking = require("../models/Booking");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Create slot
router.post("/create-slot", async (req, res) => {
  try {
    const slot = await Slot.create({ time: req.body.time });
    res.json(slot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View available slots
router.get("/slots", async (req, res) => {
  const slots = await Slot.find({ status: "available" });
  res.json(slots);
});

// Book slot
router.post("/book/:slotId", auth, async (req, res) => {
  const slot = await Slot.findOneAndUpdate(
    { _id: req.params.slotId, status: "available" },
    { status: "booked", lockedBy: req.user.id },
    { new: true }
  );

  if (!slot) {
    return res.status(400).json({ msg: "Slot already booked" });
  }

  const booking = await Booking.create({
    userId: req.user.id,
    slotId: slot._id
  });

  res.json({ msg: "Booking confirmed", booking });
});

module.exports = router;
