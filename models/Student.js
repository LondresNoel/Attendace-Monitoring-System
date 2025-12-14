import mongoose from "mongoose";

// define Student schema
const studentSchema = new mongoose.Schema(
  {
    // unique student identifier
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
      trim: true,
    },

    // full name of the student
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    // course or program (e.g., BSIT)
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
    },

    // year level (e.g., 1st Year, 2nd Year)
    yearLevel: {
      type: String,
      required: [true, "Year level is required"],
      trim: true,
    },
  },
  {
    // automatically add createdAt and updatedAt
    timestamps: true,
  }
);

// create Student model for the database
const Student = mongoose.model("Student", studentSchema);

export default Student;

