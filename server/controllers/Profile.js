const Profile = require("../models/Profile");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");
const User = require("../models/User");

const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;

    const userId = req.user.id;

    const userDetails = await User.findById(userId);
    const profile = await Profile.findById(userDetails.additionalDetails);

    await User.findByIdAndUpdate(userId, { firstName, lastName });

    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    profile.gender = gender;

    await profile.save();

    const updatedUserDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE ACCOUNT =================
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await Profile.findByIdAndDelete(user.additionalDetails);

    for (const courseId of user.courses) {
      await Course.findByIdAndUpdate(courseId, {
        $pull: { studentsEnrolled: userId },
      });
    }

    await CourseProgress.deleteMany({ userId });

    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User could not be deleted",
    });
  }
};

// ================= GET USER DETAILS =================
exports.getAllUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE DISPLAY PICTURE =================
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { image: image.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Image updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ENROLLED COURSES =================
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    let userDetails = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    userDetails = userDetails.toObject();

    for (let i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      let subSectionLength = 0;

      for (let j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        const subsections = userDetails.courses[i].courseContent[j].subSection;

        totalDurationInSeconds += subsections.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration || 0),
          0
        );

        subSectionLength += subsections.length;
      }

      userDetails.courses[i].totalDuration =
        convertSecondsToDuration(totalDurationInSeconds);

      let progress = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId,
      });

      const completedVideos = progress?.completedVideos?.length || 0;

      if (subSectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        userDetails.courses[i].progressPercentage = Math.round(
          (completedVideos / subSectionLength) * 100 * 100
        ) / 100;
      }
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= INSTRUCTOR DASHBOARD =================
exports.instructorDashboard = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id });

    const courseStats = courses.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };
    });

    return res.status(200).json({
      success: true,
      courses: courseStats,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};