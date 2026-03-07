const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      trim: true,
    },

    courseDescription: {
      type: String,
      trim: true,
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    whatYouWillLearn: {
      type: String,
      trim: true,
    },

    courseContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],

    ratingAndReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
      },
    ],

    price: {
      type: Number,
      min: 0,
    },

    thumbnail: {
      type: String,
    },

    tag: {
      type: [String],
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    instructions: {
      type: [String],
    },

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);