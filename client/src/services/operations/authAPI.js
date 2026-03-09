import { toast } from "react-hot-toast";

import { setLoading, setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";

import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

const {
  SEND_OTP,
  SIGNUP,
  LOGIN,
  RESET_PASS_TOKEN,
  RESET_PASSWORD,
} = endpoints;

/* ---------- SEND OTP ---------- */

export const sendOtp = (email, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SEND_OTP, {
        email,
        checkUserPresent: true,
      });

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.error("SEND OTP ERROR:", error);
      toast.error("Could Not Send OTP");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

/* ---------- SIGNUP ---------- */

export const signUp = (
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.error("SIGNUP ERROR:", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

/* ---------- LOGIN ---------- */

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN, {
        email,
        password,
      });

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      const { token, user } = response.data;

      dispatch(setToken(token));
      dispatch(setUser(user));

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login Successful");
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      toast.error("Login Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

/* ---------- LOGOUT ---------- */

export const logout = (navigate) => {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged Out");
    navigate("/");
  };
};

/* ---------- REQUEST PASSWORD RESET ---------- */

export const getPasswordResetToken = (email, setEmailSent) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESET_PASS_TOKEN, { email });

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.error("RESET TOKEN ERROR:", error);
      toast.error("Failed to send reset email");
    }

    dispatch(setLoading(false));
  };
};

/* ---------- RESET PASSWORD ---------- */

export const resetPassword = (password, confirmPassword, token) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESET_PASSWORD, {
        password,
        confirmPassword,
        token,
      });

      if (!response?.data?.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password reset successfully");
    } catch (error) {
      console.error("RESET PASSWORD ERROR:", error);
      toast.error("Unable to reset password");
    }

    dispatch(setLoading(false));
  };
};