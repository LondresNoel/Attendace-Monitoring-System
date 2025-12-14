import mongoose from "mongoose";

// pag define han Student schema
const studentSchema = new mongoose.Schema(
  {
    // unique nga student ID
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
      trim: true,
    },

    // bug-os nga ngaran han estudyante
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    // kurso han estudyante (e.g. BSIT)
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
    },

    // year level han estudyante
    yearLevel: {
      type: String,
      required: [true, "Year level is required"],
      trim: true,
    },
  },
  {
    // automatic nga createdAt ngan updatedAt
    timestamps: true,
  }
);

// pag create han Student model
const Student = mongoose.model("Student", studentSchema);

export default Student;
