import { toast } from "react-hot-toast";

import { setLoading, setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { logout } from "./authAPI";

const {
  GET_USER_DETAILS,
  GET_USER_ENROLLED_COURSES,
  GET_INSTRUCTOR_DASHBOARD,
} = profileEndpoints;

/* ---------- GET USER DETAILS ---------- */

export const getUserDetails = (token, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "GET",
        GET_USER_DETAILS,
        null,
        { Authorization: `Bearer ${token}` }
      );

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      const userData = response.data.data;

      const userImage =
        userData.image ??
        `https://api.dicebear.com/5.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`;

      dispatch(setUser({ ...userData, image: userImage }));
    } catch (error) {
      console.error("GET_USER_DETAILS ERROR:", error);
      dispatch(logout(navigate));
      toast.error("Could Not Get User Details");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

/* ---------- GET ENROLLED COURSES ---------- */

export const getUserEnrolledCourses = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES,
      null,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data;
  } catch (error) {
    console.error("GET_ENROLLED_COURSES ERROR:", error);
    toast.error("Could Not Get Enrolled Courses");
  }

  toast.dismiss(toastId);
  return result;
};

/* ---------- GET INSTRUCTOR DASHBOARD DATA ---------- */

export const getInstructorData = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_INSTRUCTOR_DASHBOARD,
      null,
      { Authorization: `Bearer ${token}` }
    );

    result = response?.data?.courses;
  } catch (error) {
    console.error("GET_INSTRUCTOR_DATA ERROR:", error);
    toast.error("Could Not Get Instructor Data");
  }

  toast.dismiss(toastId);
  return result;
};