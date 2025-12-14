import express from "express";
import { markAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

// pag mark han attendance han estudyante
router.post("/mark", markAttendance);

export default router;
