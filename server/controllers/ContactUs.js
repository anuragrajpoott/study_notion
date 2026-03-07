const { contactUsEmail } = require("../mail/templates/contactFormRes");
const mailSender = require("../utils/mailSender");

exports.contactUsController = async (req, res) => {
  try {
    const { email, firstname, lastname, message, phoneNo, countrycode } = req.body;

    await mailSender(
      email,
      "Your data was received successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    );

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};