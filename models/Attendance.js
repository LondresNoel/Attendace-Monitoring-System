import mongoose from "mongoose";

// pag define han Attendance schema
const attendanceSchema = new mongoose.Schema(
  {
    // studentId para hibaroan kun hin-o an estudyante
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      trim: true,
    },

    // petsa han attendance
    date: {
      type: String,
      required: [true, "Date is required"],
      trim: true,
    },

    // status han attendance
    status: {
      type: String,
      enum: ["Present", "Absent", "Late"],
      required: [true, "Attendance status is required"],
    },
  },
  {
    // automatic timestamps
    timestamps: true,
  }
);

// pag create han Attendance model
const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
