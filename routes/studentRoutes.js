import express from "express";
import {
  getAllStudents,
  createStudent,
} from "../Controllers/studentController.js";

const router = express.Router();

// pag kuha han ngatanan nga estudyante
router.get("/", getAllStudents);

// pag create hin bag-o nga estudyante
router.post("/", createStudent);

router.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Attendance.deleteMany({ studentId: student._id });

    res.status(200).json({ message: "Student and attendance records deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
