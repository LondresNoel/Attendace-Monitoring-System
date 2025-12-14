import express from "express";
import { markAttendance } from "../Controllers/attendanceController.js";
import { getStudentsWithAttendance } from "../Controllers/attendanceController.js";


const router = express.Router();

// pag mark han attendance han estudyante
router.post("/mark", markAttendance);

// pagkita an attendance an estudyante
router.get("/students", getStudentsWithAttendance);


export default router;
