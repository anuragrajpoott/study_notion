import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";

const {
  GET_ALL_COURSES,
  GET_COURSE_DETAILS,
  COURSE_CATEGORIES,
  CREATE_COURSE,
  EDIT_COURSE,
  CREATE_SECTION,
  CREATE_SUBSECTION,
  UPDATE_SECTION,
  UPDATE_SUBSECTION,
  DELETE_SECTION,
  DELETE_SUBSECTION,
  GET_INSTRUCTOR_COURSES,
  DELETE_COURSE,
  GET_FULL_COURSE_DETAILS,
  CREATE_RATING,
  UPDATE_COURSE_PROGRESS,
} = courseEndpoints;

/* ---------- GET ALL COURSES ---------- */

export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector("GET", GET_ALL_COURSES);

    if (!response?.data?.success) {
      throw new Error("Could not fetch courses");
    }

    result = response.data.data;
  } catch (error) {
    console.error("GET_ALL_COURSES ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ---------- FETCH COURSE DETAILS ---------- */

export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector("POST", GET_COURSE_DETAILS, { courseId });

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }

    result = response.data;
  } catch (error) {
    console.error("COURSE_DETAILS ERROR:", error);
    result = error?.response?.data;
  }

  toast.dismiss(toastId);
  return result;
};

/* ---------- FETCH COURSE CATEGORIES ---------- */

export const fetchCourseCategories = async () => {
  let result = [];

  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES);

    if (!response?.data?.success) {
      throw new Error("Could not fetch course categories");
    }

    result = response.data.data;
  } catch (error) {
    console.error("COURSE_CATEGORIES ERROR:", error);
    toast.error(error.message);
  }

  return result;
};

/* ---------- ADD COURSE ---------- */

export const addCourseDetails = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector("POST", CREATE_COURSE, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not add course");
    }

    toast.success("Course Details Added Successfully");
    result = response.data.data;
  } catch (error) {
    console.error("CREATE_COURSE ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ---------- EDIT COURSE ---------- */

export const editCourseDetails = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector("POST", EDIT_COURSE, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not update course");
    }

    toast.success("Course Details Updated Successfully");
    result = response.data.data;
  } catch (error) {
    console.error("EDIT_COURSE ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ---------- CREATE SECTION ---------- */

export const createSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector("POST", CREATE_SECTION, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not create section");
    }

    toast.success("Course Section Created");
    result = response.data.updatedCourse;
  } catch (error) {
    console.error("CREATE_SECTION ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ---------- CREATE SUBSECTION ---------- */

export const createSubSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not add lecture");
    }

    toast.success("Lecture Added");
    result = response.data.data;
  } catch (error) {
    console.error("CREATE_SUBSECTION ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ---------- UPDATE SECTION ---------- */

export const updateSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector("POST", UPDATE_SECTION, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not update section");
    }

    toast.success("Course Section Updated");
    result = response.data.data;
  } catch (error) {
    console.error("UPDATE_SECTION ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ---------- UPDATE SUBSECTION ---------- */

export const updateSubSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not update lecture");
    }

    toast.success("Lecture Updated");
    result = response.data.data;
  } catch (error) {
    console.error("UPDATE_SUBSECTION ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ---------- DELETE SECTION ---------- */

export const deleteSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector("POST", DELETE_SECTION, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not delete section");
    }

    toast.success("Course Section Deleted");
    result = response.data.data;
  } catch (error) {
    console.error("DELETE_SECTION ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ---------- DELETE SUBSECTION ---------- */

export const deleteSubSection = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not delete lecture");
    }

    toast.success("Lecture Deleted");
    result = response.data.data;
  } catch (error) {
    console.error("DELETE_SUBSECTION ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ---------- FETCH INSTRUCTOR COURSES ---------- */

export const fetchInstructorCourses = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_COURSES, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not fetch instructor courses");
    }

    result = response.data.data;
  } catch (error) {
    console.error("INSTRUCTOR_COURSES ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ---------- DELETE COURSE ---------- */

export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("DELETE", DELETE_COURSE, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not delete course");
    }

    toast.success("Course Deleted");
  } catch (error) {
    console.error("DELETE_COURSE ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
};

/* ---------- GET FULL COURSE DETAILS ---------- */

export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS,
      { courseId },
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data;
  } catch (error) {
    console.error("FULL_COURSE_DETAILS ERROR:", error);
    result = error?.response?.data;
  }

  toast.dismiss(toastId);
  return result;
};

/* ---------- MARK LECTURE COMPLETE ---------- */

export const markLectureAsComplete = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = false;

  try {
    const response = await apiConnector(
      "POST",
      UPDATE_COURSE_PROGRESS,
      data,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.message) {
      throw new Error(response.data.error);
    }

    toast.success("Lecture Completed");
    result = true;
  } catch (error) {
    console.error("LECTURE_COMPLETION ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ---------- CREATE RATING ---------- */

export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;

  try {
    const response = await apiConnector("POST", CREATE_RATING, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Could not create rating");
    }

    toast.success("Rating Created");
    success = true;
  } catch (error) {
    console.error("CREATE_RATING ERROR:", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return success;
};