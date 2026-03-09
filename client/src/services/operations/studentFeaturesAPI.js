import { toast } from "react-hot-toast";

import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";



import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  COURSE_PAYMENT,
  COURSE_VERIFY,
  PAYMENT_SUCCESS_EMAIL,
} = studentEndpoints;

/* ---------- LOAD RAZORPAY SCRIPT ---------- */

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

/* ---------- BUY COURSE ---------- */

export const buyCourse = async (token, courses, userDetails, navigate, dispatch) => {
  const toastId = toast.loading("Loading...");

  try {
    const scriptLoaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!scriptLoaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    /* ---------- CREATE ORDER ---------- */

    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT,
      { courses },
      { Authorization: `Bearer ${token}` }
    );

    if (!orderResponse?.data?.success) {
      throw new Error(orderResponse.data.message);
    }

    const orderData = orderResponse.data.data;

    /* ---------- PAYMENT OPTIONS ---------- */

    

    const options = {
  key: process.env.REACT_APP_RAZORPAY_KEY,
  currency: orderData.currency,
  amount: orderData.amount,
  order_id: orderData.id,

  name: "StudyNotion",
  description: "Thank you for purchasing the course",
  image: "https://razorpay.com/assets/razorpay-logo.svg",

  prefill: {
    name: userDetails.firstName,
    email: userDetails.email,
  },

  handler: (response) => {
    sendPaymentSuccessEmail(response, orderData.amount, token);

    verifyPayment(
      { ...response, courses },
      token,
      navigate,
      dispatch
    );
  },
};

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();

    paymentObject.on("payment.failed", (response) => {
      console.error("RAZORPAY PAYMENT FAILED:", response.error);
      toast.error("Payment failed");
    });
  } catch (error) {
    console.error("PAYMENT ERROR:", error);
    toast.error("Could not complete payment");
  }

  toast.dismiss(toastId);
};

/* ---------- SEND PAYMENT SUCCESS EMAIL ---------- */

const sendPaymentSuccessEmail = async (response, amount, token) => {
  try {
    await apiConnector(
      "POST",
      PAYMENT_SUCCESS_EMAIL,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      { Authorization: `Bearer ${token}` }
    );
  } catch (error) {
    console.error("PAYMENT SUCCESS EMAIL ERROR:", error);
  }
};

/* ---------- VERIFY PAYMENT ---------- */

const verifyPayment = async (bodyData, token, navigate, dispatch) => {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector(
      "POST",
      COURSE_VERIFY,
      bodyData,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment successful. You are now enrolled!");
    navigate("/dashboard/enrolled-courses");

    dispatch(resetCart());
  } catch (error) {
    console.error("PAYMENT VERIFY ERROR:", error);
    toast.error("Could not verify payment");
  }

  dispatch(setPaymentLoading(false));
  toast.dismiss(toastId);
};