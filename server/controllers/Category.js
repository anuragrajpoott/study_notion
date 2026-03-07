const Category = require("../models/Category");

const getRandomInt = (max) => Math.floor(Math.random() * max);

// ================= CREATE CATEGORY =================
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    await Category.create({ name, description });

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= SHOW ALL CATEGORIES =================
exports.showAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CATEGORY PAGE DETAILS =================
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: { path: "ratingAndReviews" },
      })
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (!selectedCategory.courses.length) {
      return res.status(404).json({
        success: false,
        message: "No courses found for this category",
      });
    }

    const otherCategories = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = null;

    if (otherCategories.length > 0) {
      const randomCategory =
        otherCategories[getRandomInt(otherCategories.length)];

      differentCategory = await Category.findById(randomCategory._id)
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec();
    }

    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: { path: "instructor" },
      })
      .exec();

    const allCourses = allCategories.flatMap((category) => category.courses);

    const mostSellingCourses = allCourses
      .sort((a, b) => (b.studentsEnrolled?.length || 0) - (a.studentsEnrolled?.length || 0))
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};