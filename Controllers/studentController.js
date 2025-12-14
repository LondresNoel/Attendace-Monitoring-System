import Student from "../models/Student.js";
import { successResponse, errorResponse } from "../helpers/responseHelper.js";

// pag kuha han ngatanan nga estudyante tikang ha database
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    // pag send hin success response
    successResponse(res, 200, "Students retrieved successfully", students);
  } catch (error) {
    errorResponse(
      res,
      500,
      "An error occurred while retrieving students",
      error
    );
  }
};

// pag create hin bag-o nga estudyante
export const createStudent = async (req, res) => {
  try {
    // pag extract han data tikang ha request body
    const { studentId, fullName, course, yearLevel } = req.body;

    // simple validation
    if (!studentId || !fullName || !course || !yearLevel) {
      errorResponse(res, 400, "All student fields are required");
      return;
    }

    // pag check kon may existing nga studentId
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      errorResponse(res, 400, "Student ID already exists");
      return;
    }

    // pag create han bag-o nga student ha database
    const newStudent = await Student.create({
      studentId,
      fullName,
      course,
      yearLevel,
    });

    // pag send hin success response
    successResponse(res, 201, "Student created successfully", newStudent);
  } catch (error) {
    errorResponse(res, 500, "An error occurred while creating the student", error);
  }
};

// pag delete hin student tikang ha database
export const deleteStudent = async (req, res) => {
  try {
    // pag extract han student ID tikang ha request query
    const { id } = req.query;

    // simple validation
    if (!id) {
      errorResponse(res, 400, "Student ID is required");
      return;
    }

    // pag delete han student
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      errorResponse(res, 404, "Student not found");
      return;
    }

    // pag send hin success response
    successResponse(res, 200, "Student deleted successfully");
  } catch (error) {
    errorResponse(res, 500, "An error occurred while deleting the student", error);
  }
};

// pag update han student information
export const updateStudent = async (req, res) => {
  try {
    // pag extract han student ID tikang ha request parameters
    const { id } = req.params;

    // pag extract han updated data tikang ha request body
    const { studentId, fullName, course, yearLevel } = req.body;

    // pag update han student ha database
    const student = await Student.findByIdAndUpdate(
      id,
      { studentId, fullName, course, yearLevel },
      { new: true, runValidators: true }
    );

    // kon waray ma update
    if (!student) {
      errorResponse(res, 404, "Student not found");
      return;
    }

    // pag send hin success response
    successResponse(res, 200, "Student updated successfully", student);
  } catch (error) {
    errorResponse(
      res,
      500,
      "An error occurred while updating the student",
      error
    );
  }
};
