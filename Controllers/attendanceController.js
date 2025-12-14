import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import { successResponse, errorResponse } from "../helpers/responseHelper.js";

// pag mark han attendance han estudyante
export const markAttendance = async (req, res) => {
  try {
    // pag kuha han data tikang ha request body
    const { studentId, date, status } = req.body;

    // validation
    if (!studentId || !date || !status) {
      errorResponse(res, 400, "Student ID, date, and status are required");
      return;
    }

    // pag check kon existing an student
    const student = await Student.findOne({ studentId });
    if (!student) {
      errorResponse(res, 404, "Student not found");
      return;
    }

    // pag check kon may attendance na para hini nga adlaw
    const existingAttendance = await Attendance.findOne({ studentId, date });
    if (existingAttendance) {
      errorResponse(res, 400, "Attendance already recorded");
      return;
    }

    // pag create han attendance record
    const attendance = await Attendance.create({
      studentId,
      date,
      status,
    });

    // pag send hin success response
    successResponse(res, 201, "Attendance recorded successfully", attendance);
  } catch (error) {
    errorResponse(res, 500, "Error recording attendance", error);
  }
};
