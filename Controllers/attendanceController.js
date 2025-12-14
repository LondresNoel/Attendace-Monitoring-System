import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import { successResponse, errorResponse } from "../helpers/responseHelper.js";

// ⭐ Controller 1: Pag mark han attendance han estudyante (Mark Attendance)
export const markAttendance = async (req, res) => {
  try {
    // Pag kuha han data tikang ha request body
    const { studentId, date, status } = req.body;

    // Validation
    if (!studentId || !date || !status) {
      errorResponse(res, 400, "Student ID, date, and status are required");
      return;
    }

    // Pag check kon existing an student
    const student = await Student.findOne({ studentId });
    if (!student) {
      errorResponse(res, 404, "Student not found");
      return;
    }

    // Pag check kon may attendance na para hini nga adlaw
    const existingAttendance = await Attendance.findOne({ studentId, date });
    if (existingAttendance) {
      errorResponse(res, 400, "Attendance already recorded for this date");
      return;
    }

    // Pag create han attendance record
    const attendance = await Attendance.create({
      studentId,
      date,
      status,
    });

    // Pag send hin success response
    successResponse(res, 201, "Attendance recorded successfully", attendance);
  } catch (error) {
    errorResponse(res, 500, "Error recording attendance", error);
  }
};

// ⭐ Controller 2: Pag kuha han tanan nga estudyante upod an ira attendance (Get Students with Attendance)
export const getStudentsWithAttendance = async (req, res) => {
  try {
    // Get date from query OR use today in YYYY-MM-DD format
    const date =
      req.query.date ||
      new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // Get all students
    const students = await Student.find();

    // Combine students + attendance
    const result = await Promise.all(
      students.map(async (student) => {
        const attendance = await Attendance.findOne({
          studentId: student.studentId,
          date: date, // STRING MATCH
        });

        return {
          studentId: student.studentId,
          fullName: student.fullName,
          course: student.course,
          yearLevel: student.yearLevel,
          date: date,
          status: attendance ? attendance.status : "Not Marked",
        };
      })
    );

    successResponse(res, 200, "Students with attendance retrieved successfully", result);
  } catch (error) {
    // Changed to use the errorResponse helper for consistency
    errorResponse(res, 500, "Error retrieving students with attendance", error);
  }
};