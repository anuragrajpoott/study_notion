const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// -------------------- Database --------------------
database.connect();

// -------------------- Cloudinary --------------------
cloudinaryConnect();

// -------------------- Middlewares --------------------
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://study-notion-nine-rho.vercel.app",
    ],
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// -------------------- Routes --------------------
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// -------------------- Health Check --------------------
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is up and running...",
  });
});

// -------------------- Server --------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});