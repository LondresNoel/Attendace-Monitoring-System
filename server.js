import express from "express";
import dotenv from "dotenv";

// pag import han routes
import studentRoutes from "./routes/studentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

// pag import han database connection
import connectDB from "./config/database.js";

// pag load han environment variables tikang ha .env
dotenv.config();

// pag connect ha MongoDB
connectDB();

// pag create han express app
const app = express();

// pag gamit han PORT tikang ha .env o default 3000
const PORT = process.env.PORT || 3000;

// middleware para ma-read an JSON request body
app.use(express.json());

// pag register han API routes
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);

// test route para hibaroan kon nagdadagan an server
app.get("/", (req, res) => {
  res.send("Attendance Monitoring API is running");
});

// pag start han server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
