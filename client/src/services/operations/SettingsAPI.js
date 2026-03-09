import { toast } from "react-hot-toast";

import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";
import { logout } from "./authAPI";

const {
  UPDATE_DISPLAY_PICTURE,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  DELETE_PROFILE,
} = settingsEndpoints;

/* ---------- UPDATE DISPLAY PICTURE ---------- */

export const updateDisplayPicture = (token, formData) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      dispatch(setUser(response.data.data));
      toast.success("Display picture updated successfully");
    } catch (error) {
      console.error("UPDATE_DISPLAY_PICTURE ERROR:", error);
      toast.error("Could not update display picture");
    }

    toast.dismiss(toastId);
  };
};

/* ---------- UPDATE PROFILE ---------- */

export const updateProfile = (token, formData) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_PROFILE,
        formData,
        { Authorization: `Bearer ${token}` }
      );

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      const userData = response.data.updatedUserDetails;

      const userImage =
        userData.image ??
        `https://api.dicebear.com/5.x/initials/svg?seed=${userData.firstName} ${userData.lastName}`;

      dispatch(setUser({ ...userData, image: userImage }));

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("UPDATE_PROFILE ERROR:", error);
      toast.error("Could not update profile");
    }

    toast.dismiss(toastId);
  };
};

/* ---------- CHANGE PASSWORD ---------- */

export const changePassword = async (token, formData) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector(
      "POST",
      CHANGE_PASSWORD,
      formData,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }

    toast.success("Password changed successfully");
  } catch (error) {
    console.error("CHANGE_PASSWORD ERROR:", error);
    toast.error(error?.response?.data?.message || "Failed to change password");
  }

  toast.dismiss(toastId);
};

/* ---------- DELETE PROFILE ---------- */

export const deleteProfile = (token, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_PROFILE,
        null,
        { Authorization: `Bearer ${token}` }
      );

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      toast.success("Profile deleted successfully");
      dispatch(logout(navigate));
    } catch (error) {
      console.error("DELETE_PROFILE ERROR:", error);
      toast.error("Could not delete profile");
    }

    toast.dismiss(toastId);
  };
};