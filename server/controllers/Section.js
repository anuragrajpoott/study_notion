const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

// ================= CREATE SECTION =================
exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Section name and courseId are required",
      });
    }

    const newSection = await Section.create({ sectionName });

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { courseContent: newSection._id } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Create section error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create section",
    });
  }
};

// ================= UPDATE SECTION =================
exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;

    if (!sectionId || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "SectionId and sectionName are required",
      });
    }

    await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: course,
    });
  } catch (error) {
    console.error("Update section error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update section",
    });
  }
};

// ================= DELETE SECTION =================
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    await Course.findByIdAndUpdate(courseId, {
      $pull: { courseContent: sectionId },
    });

    await SubSection.deleteMany({ _id: { $in: section.subSection } });

    await Section.findByIdAndDelete(sectionId);

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Delete section error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete section",
    });
  }
};