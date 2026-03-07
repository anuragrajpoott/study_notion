const express = require("express");
const router = express.Router();

const { contactUsController } = require("../controllers/ContactUs");

// ================= CONTACT ROUTE =================
router.post("/contact", contactUsController);

module.exports = router;