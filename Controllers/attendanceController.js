import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
import { successResponse, errorResponse } from "../helpers/responseHelper.js";

// ⭐ Controller 1: Pag mark han attendance han estudyante (Mark Attendance)
export const markAttendance = async (req, res) => {
  try {
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

// ⭐ Controller 2: Pagkuha han tanan nga estudyante upod an ira attendance by date
// ✅ Modified to hide dates where ALL students are "Not Marked"
export const getAllAttendanceByDate = async (req, res) => {
  try {
    // Pagkuha han tanan nga estudyante
    const students = await Student.find();

    // Pagkuha han tanan nga attendance records
    const attendances = await Attendance.find();

    // Pag-group han attendance by date
    const attendanceByDate = {};

    attendances.forEach((att) => {
      if (!attendanceByDate[att.date]) {
        attendanceByDate[att.date] = [];
      }

      // Pagkuha han fullName tikang ha Student collection
      const student = students.find((s) => s.studentId === att.studentId);

      if (student) {
        attendanceByDate[att.date].push({
          fullName: student.fullName,
          status: att.status,
        });
      }
    });

    // Pag-add han mga estudyante nga waray record para ha adlaw
    Object.keys(attendanceByDate).forEach((date) => {
      const recordedStudents = attendanceByDate[date].map((s) => s.fullName);

      students.forEach((student) => {
        if (!recordedStudents.includes(student.fullName)) {
          attendanceByDate[date].push({
            fullName: student.fullName,
            status: "Not Marked", // Waray pa na mark
          });
        }
      });
    });

    // Pag-convert han object ngadto ha array para mas maayos i-return
    let data = Object.entries(attendanceByDate).map(([date, students]) => ({
      date,
      students,
    }));

    // ✅ Filter out dates where ALL students are "Not Marked"
    data = data.filter((day) =>
      day.students.some((s) => s.status !== "Not Marked")
    );

    successResponse(res, 200, "Students attendance retrieved successfully", data);
  } catch (error) {
    errorResponse(res, 500, "Error retrieving attendance by date", error);
  }
};
