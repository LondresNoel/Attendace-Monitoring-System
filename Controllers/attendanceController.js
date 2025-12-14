import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import { successResponse, errorResponse } from "../helpers/responseHelper.js";

// pag mark han attendance han estudyante
export const markAttendance = async (req, res) => {
  try {
    // pag extract han data tikang ha request body
    const { studentId, date, status } = req.body;

    // simple validation
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

    // pag check kon may attendance na hiya para hito nga adlaw
    const existingAttendance = await Attendance.findOne({
      studentId,
      date,
    });

    if (existingAttendance) {
      errorResponse(res, 400, "Attendance already recorded for this date");
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
    errorResponse(
      res,
      500,
      "An error occurred while recording attendance",
      error
    );
  }
};

// pag kuha han attendance pinaagi han date
export const getAttendanceByDate = async (req, res) => {
  try {
    // pag extract han date tikang ha request parameters
    const { date } = req.params;

    if (!date) {
      errorResponse(res, 400, "Date is required");
      return;
    }

    const attendanceRecords = await Attendance.find({ date });

    successResponse(
      res,
      200,
      "Attendance records retrieved successfully",
      attendanceRecords
    );
  } catch (error) {
    errorResponse(
      res,
      500,
      "An error occurred while retrieving attendance records",
      error
    );
  }
};

// pag kuha han attendance han usa nga estudyante
export const getAttendanceByStudent = async (req, res) => {
  try {
    // pag extract han studentId tikang ha request parameters
    const { studentId } = req.params;

    if (!studentId) {
      errorResponse(res, 400, "Student ID is required");
      return;
    }

    const attendanceRecords = await Attendance.find({ studentId });

    successResponse(
      res,
      200,
      "Student attendance retrieved successfully",
      attendanceRecords
    );
  } catch (error) {
    errorResponse(
      res,
      500,
      "An error occurred while retrieving student attendance",
      error
    );
  }
};
