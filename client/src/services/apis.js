/* ---------- Base URL ---------- */

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:4000/api/v1"
    : "https://study-notion-5wg3.onrender.com/api/v1";

/* ---------- Auth Endpoints ---------- */

export const endpoints = {
  SEND_OTP: `${BASE_URL}/auth/sendotp`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGIN: `${BASE_URL}/auth/login`,
  RESET_PASS_TOKEN: `${BASE_URL}/auth/reset-password-token`,
  RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
};

/* ---------- Profile Endpoints ---------- */

export const profileEndpoints = {
  GET_USER_DETAILS: `${BASE_URL}/profile/getUserDetails`,
  GET_USER_ENROLLED_COURSES: `${BASE_URL}/profile/getEnrolledCourses`,
  GET_INSTRUCTOR_DASHBOARD: `${BASE_URL}/profile/instructorDashboard`,
};

/* ---------- Student Payment Endpoints ---------- */

export const studentEndpoints = {
  COURSE_PAYMENT: `${BASE_URL}/payment/capturePayment`,
  COURSE_VERIFY: `${BASE_URL}/payment/verifyPayment`,
  PAYMENT_SUCCESS_EMAIL: `${BASE_URL}/payment/sendPaymentSuccessEmail`,
};

/* ---------- Course Endpoints ---------- */

export const courseEndpoints = {
  GET_ALL_COURSES: `${BASE_URL}/course/getAllCourses`,
  GET_COURSE_DETAILS: `${BASE_URL}/course/getCourseDetails`,
  EDIT_COURSE: `${BASE_URL}/course/editCourse`,
  COURSE_CATEGORIES: `${BASE_URL}/course/showAllCategories`,
  CREATE_COURSE: `${BASE_URL}/course/createCourse`,
  CREATE_SECTION: `${BASE_URL}/course/addSection`,
  CREATE_SUBSECTION: `${BASE_URL}/course/addSubSection`,
  UPDATE_SECTION: `${BASE_URL}/course/updateSection`,
  UPDATE_SUBSECTION: `${BASE_URL}/course/updateSubSection`,
  GET_INSTRUCTOR_COURSES: `${BASE_URL}/course/getInstructorCourses`,
  DELETE_SECTION: `${BASE_URL}/course/deleteSection`,
  DELETE_SUBSECTION: `${BASE_URL}/course/deleteSubSection`,
  DELETE_COURSE: `${BASE_URL}/course/deleteCourse`,
  GET_FULL_COURSE_DETAILS: `${BASE_URL}/course/getFullCourseDetails`,
  UPDATE_COURSE_PROGRESS: `${BASE_URL}/course/updateCourseProgress`,
  CREATE_RATING: `${BASE_URL}/course/createRating`,
};

/* ---------- Ratings & Reviews ---------- */

export const ratingsEndpoints = {
  GET_REVIEWS: `${BASE_URL}/course/getReviews`,
};

/* ---------- Categories ---------- */

export const categoriesEndpoints = {
  GET_ALL_CATEGORIES: `${BASE_URL}/course/showAllCategories`,
};

/* ---------- Catalog ---------- */

export const catalogEndpoints = {
  GET_CATALOG_PAGE_DATA: `${BASE_URL}/course/getCategoryPageDetails`,
};

/* ---------- Contact ---------- */

export const contactEndpoints = {
  CONTACT_US: `${BASE_URL}/reach/contact`,
};

/* ---------- Settings ---------- */

export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE: `${BASE_URL}/profile/updateDisplayPicture`,
  UPDATE_PROFILE: `${BASE_URL}/profile/updateProfile`,
  CHANGE_PASSWORD: `${BASE_URL}/auth/changepassword`,
  DELETE_PROFILE: `${BASE_URL}/profile/deleteProfile`,
};
