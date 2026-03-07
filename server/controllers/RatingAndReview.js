const RatingAndReview = require("../models/RatingAndRaview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// ================= CREATE RATING =================
exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;

    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in this course",
      });
    }

    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "You have already reviewed this course",
      });
    }

    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    await Course.findByIdAndUpdate(courseId, {
      $push: { ratingAndReviews: ratingReview._id },
    });

    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
      ratingReview,
    });
  } catch (error) {
    console.error("Create rating error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create rating",
    });
  }
};

// ================= GET AVERAGE RATING =================
exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body;

    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({
      success: true,
      averageRating: 0,
      message: "No ratings yet",
    });
  } catch (error) {
    console.error("Get average rating error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch average rating",
    });
  }
};

// ================= GET ALL RATINGS =================
exports.getAllRating = async (req, res) => {
  try {
    const reviews = await RatingAndReview.find({})
      .sort({ rating: -1 })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      });

    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    console.error("Get ratings error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};