const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
    {
        time: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["available", "booked"],
            default: "available"
        },
        lockedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Slot", slotSchema);
