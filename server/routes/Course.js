const express = require("express");
const router = express.Router();

// ================= CONTROLLERS =================
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course");

const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection");

const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

const { updateCourseProgress } = require("../controllers/courseProgress");

// ================= MIDDLEWARE =================
const { auth, isInstructor, isStudent } = require("../middlewares/auth");

// ================= COURSE ROUTES =================
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/editCourse", auth, isInstructor, editCourse);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

// ================= SECTION ROUTES =================
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

// ================= SUBSECTION ROUTES =================
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

// ================= COURSE PROGRESS =================
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ================= CATEGORY ROUTES =================
router.post("/createCategory", auth, isInstructor, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ================= RATING & REVIEWS =================
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;