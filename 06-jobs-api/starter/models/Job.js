const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company name"],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide the position"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "decliend", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User Id",
      required: [true, "please provide user id"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
