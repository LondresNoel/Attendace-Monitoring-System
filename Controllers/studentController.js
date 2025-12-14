import Student from "../models/Student.js";
import { successResponse, errorResponse } from "../helpers/responseHelper.js";

// pag kuha han ngatanan nga estudyante tikang ha database
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    // pag send hin success response
    successResponse(res, 200, "Students retrieved successfully", students);
  } catch (error) {
    errorResponse(res, 500, "Error retrieving students", error);
  }
};

// pag create hin bag-o nga estudyante
export const createStudent = async (req, res) => {
  try {
    // pag kuha han data tikang ha request body
    const { studentId, firstName, lastName, course, yearLevel } = req.body;

    // simple validation
    if (!studentId || !firstName || !lastName || !course || !yearLevel) {
      errorResponse(res, 400, "All student fields are required");
      return;
    }

    // pag combine han first ngan last name
    const fullName = `${firstName} ${lastName}`;

    // pag check kon may existing studentId na
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      errorResponse(res, 400, "Student ID already exists");
      return;
    }

    // pag save han student ha database
    const newStudent = await Student.create({
      studentId,
      fullName,
      course,
      yearLevel,
    });

    // pag send hin success response
    successResponse(res, 201, "Student created successfully", newStudent);
  } catch (error) {
    errorResponse(res, 500, "Error creating student", error);
  }
};




export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const deletedStudent = await Student.findOneAndDelete({ studentId });

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};