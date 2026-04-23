const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const connectDB = require('./config/db');
const inquiryRoutes = require('./Routers/inquiryRoutes');
const userRouters = require('./Routers/userRoutes');
const feedbackRoutes = require('./Routers/feedbackRoutes');
const websiteRoutes = require('./Routers/websiteRoutes');
const documentRoutes = require('./Routers/documentRoutes');
const paymentRoutes = require('./Routers/paymentRoutes');
const dotenv = require("dotenv");
dotenv.config(); // 👈 MUST be FIRST

const app = express();
connectDB();

// Middleware to parse JSON bodies

app.use(cors({
  origin: ["http://localhost:5173"], // your React URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// app.use(cors());
app.use(express.json());
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


//path routes
app.use('/inquiries', inquiryRoutes);
app.use("/users", userRouters);
app.use("/feedbacks", feedbackRoutes);
app.use("/websites", websiteRoutes);
app.use("/documents", documentRoutes);
app.use("/payments", paymentRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});