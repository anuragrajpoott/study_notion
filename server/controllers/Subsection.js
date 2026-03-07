const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// ================= CREATE SUBSECTION =================
exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const video = req.files?.video;

    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    const newSubSection = await SubSection.create({
      title,
      description,
      videoUrl: uploadDetails.secure_url,
      timeDuration: `${uploadDetails.duration}`,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: newSubSection._id } },
      { new: true }
    ).populate("subSection");

    return res.status(200).json({
      success: true,
      data: updatedSection,
    });
  } catch (error) {
    console.error("Create subsection error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create subsection",
    });
  }
};

// ================= UPDATE SUBSECTION =================
exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body;

    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title !== undefined) subSection.title = title;
    if (description !== undefined) subSection.description = description;

    if (req.files?.video) {
      const uploadDetails = await uploadImageToCloudinary(
        req.files.video,
        process.env.FOLDER_NAME
      );

      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    await subSection.save();

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error("Update subsection error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update subsection",
    });
  }
};

// ================= DELETE SUBSECTION =================
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    const subSection = await SubSection.findByIdAndDelete(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    await Section.findByIdAndUpdate(sectionId, {
      $pull: { subSection: subSectionId },
    });

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error("Delete subsection error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete subsection",
    });
  }
};