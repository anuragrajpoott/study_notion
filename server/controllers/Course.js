const Course = require("../models/Course");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");

const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

// ================= CREATE COURSE =================
exports.createCourse = async (req, res) => {
  try {
    const userId = req.user.id;

    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status = "Draft",
      instructions: _instructions,
    } = req.body;

    const thumbnail = req.files?.thumbnailImage;

    const tag = JSON.parse(_tag || "[]");
    const instructions = JSON.parse(_instructions || "[]");

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !category ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const instructor = await User.findById(userId);
    if (!instructor || instructor.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "Only instructors can create courses",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructor._id,
      whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status,
      instructions,
    });

    await User.findByIdAndUpdate(instructor._id, {
      $push: { courses: newCourse._id },
    });

    await Category.findByIdAndUpdate(category, {
      $push: { courses: newCourse._id },
    });

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

// ================= EDIT COURSE =================
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    if (req.files?.thumbnailImage) {
      const thumbnailImage = await uploadImageToCloudinary(
        req.files.thumbnailImage,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    for (const key in updates) {
      if (["tag", "instructions"].includes(key)) {
        course[key] = JSON.parse(updates[key]);
      } else if (key !== "courseId") {
        course[key] = updates[key];
      }
    }

    await course.save();

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      });

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ================= GET ALL COURSES =================
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find(
      { status: "Published" },
      {
        courseName: 1,
        price: 1,
        thumbnail: 1,
        instructor: 1,
        ratingAndReviews: 1,
        studentsEnrolled: 1,
      }
    ).populate("instructor");

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch courses",
    });
  }
};

// ================= GET COURSE DETAILS =================
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    let totalDurationInSeconds = 0;

    course.courseContent.forEach((section) => {
      section.subSection.forEach((sub) => {
        totalDurationInSeconds += parseInt(sub.timeDuration || 0);
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: { courseDetails: course, totalDuration },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET FULL COURSE DETAILS =================
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const course = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const progress = await CourseProgress.findOne({
      courseID: courseId,
      userId,
    });

    let totalDurationInSeconds = 0;

    course.courseContent.forEach((section) => {
      section.subSection.forEach((sub) => {
        totalDurationInSeconds += parseInt(sub.timeDuration || 0);
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails: course,
        totalDuration,
        completedVideos: progress?.completedVideos || [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= INSTRUCTOR COURSES =================
exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const courses = await Course.find({ instructor: instructorId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
    });
  }
};

// ================= DELETE COURSE =================
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    for (const studentId of course.studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    for (const sectionId of course.courseContent) {
      const section = await Section.findById(sectionId);

      if (section) {
        for (const subId of section.subSection) {
          await SubSection.findByIdAndDelete(subId);
        }
      }

      await Section.findByIdAndDelete(sectionId);
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};