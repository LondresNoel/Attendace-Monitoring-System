import express from "express";
import { markAttendance, getAllAttendanceByDate } from "../Controllers/attendanceController.js";



const router = express.Router();

// pag mark han attendance han estudyante
router.post("/mark", markAttendance);

// pagkita an attendance an estudyante
router.get("/students", getAllAttendanceByDate);


export default router;
