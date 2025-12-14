import mongoose from "mongoose";

// define Attendance schema
const attendanceSchema = new mongoose.Schema(
  {
    // reference to the student (using studentId)
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      trim: true,
    },

    // date of attendance
    date: {
      type: String,
      required: [true, "Date is required"],
      trim: true,
    },

    // attendance status
    status: {
      type: String,
      required: [true, "Attendance status is required"],
      enum: ["Present", "Absent", "Late"],
    },
  },
  {
    // automatically add createdAt and updatedAt
    timestamps: true,
  }
);

// create Attendance model for the database
const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
