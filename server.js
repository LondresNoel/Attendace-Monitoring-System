import express from "express";
import dotenv from "dotenv";

// Routes
import studentRoutes from "./routes/studentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";


import connectDB from "./config/database.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// API Routes
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);

// Test route
app.get("/", (req, res) => {
  res.send(
    `Attendance Monitoring API is running in ${
      process.env.NODE_ENV || "development"
    } mode.`
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});