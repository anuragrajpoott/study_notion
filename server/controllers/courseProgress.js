const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

// ================= UPDATE COURSE PROGRESS =================
exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subsectionId } = req.body;
    const userId = req.user.id;

    if (!courseId || !subsectionId) {
      return res.status(400).json({
        success: false,
        message: "courseId and subsectionId are required",
      });
    }

    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "Invalid subsection",
      });
    }

    const courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId,
    });

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course progress does not exist",
      });
    }

    if (courseProgress.completedVideos.includes(subsectionId)) {
      return res.status(400).json({
        success: false,
        message: "Subsection already completed",
      });
    }

    courseProgress.completedVideos.push(subsectionId);
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Course progress updated successfully",
    });
  } catch (error) {
    console.error("Update course progress error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};