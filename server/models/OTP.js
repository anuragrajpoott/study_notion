const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  otp: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // auto delete after 5 minutes
  },
});

// Send verification email
const sendVerificationEmail = async (email, otp) => {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      emailTemplate(otp)
    );

    console.log("Email sent successfully:", mailResponse.response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

// Send email after OTP document is created
otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      await sendVerificationEmail(this.email, this.otp);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model("OTP", otpSchema);