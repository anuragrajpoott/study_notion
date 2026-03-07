const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },

    timeDuration: {
      type: String,
    },

    description: {
      type: String,
      trim: true,
    },

    videoUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubSection", subSectionSchema);