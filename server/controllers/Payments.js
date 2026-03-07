const { razorpayInstance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");

const crypto = require("crypto");
const mongoose = require("mongoose");

const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");

// ================= CAPTURE PAYMENT =================
exports.capturePayment = async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide course IDs",
      });
    }

    let totalAmount = 0;

    for (const courseId of courses) {
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      const uid = new mongoose.Types.ObjectId(userId);

      if (course.studentsEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "Student already enrolled",
        });
      }

      totalAmount += course.price;
    }

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const paymentResponse = await razorpayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.error("Capture payment error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate order",
    });
  }
};

// ================= VERIFY PAYMENT =================
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courses,
    } = req.body;

    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    await enrollStudents(courses, userId);

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification error",
    });
  }
};

// ================= PAYMENT SUCCESS EMAIL =================
exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    const student = await User.findById(userId);

    await mailSender(
      student.email,
      "Payment Received",
      paymentSuccessEmail(
        `${student.firstName} ${student.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );

    return res.status(200).json({
      success: true,
      message: "Payment success email sent",
    });
  } catch (error) {
    console.error("Payment email error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not send email",
    });
  }
};

// ================= ENROLL STUDENTS =================
const enrollStudents = async (courses, userId) => {
  for (const courseId of courses) {
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $push: { studentsEnrolled: userId } },
      { new: true }
    );

    if (!course) continue;

    const progress = await CourseProgress.create({
      courseID: courseId,
      userId,
      completedVideos: [],
    });

    const student = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: courseId,
          courseProgress: progress._id,
        },
      },
      { new: true }
    );

    await mailSender(
      student.email,
      `Successfully enrolled in ${course.courseName}`,
      courseEnrollmentEmail(
        course.courseName,
        `${student.firstName} ${student.lastName}`
      )
    );
  }
};