import express from "express";
import {
  markAttendance,
  getAttendanceByDate,
  getAttendanceByStudent,
} from "../controllers/attendanceController.js";

const router = express.Router();

// pag mark han attendance han estudyante
router.post("/mark", markAttendance);

// pag kuha han attendance records pinaagi han date
router.get("/date/:date", getAttendanceByDate);

// pag kuha han attendance records han usa nga estudyante
router.get("/student/:studentId", getAttendanceByStudent);

export default router;
