import express from "express";
import {
  getAllStudents,
  createStudent,
  deleteStudent
} from "../Controllers/studentController.js";

const router = express.Router();

// pag kuha han ngatanan nga estudyante
router.get("/", getAllStudents);

// pag create hin bag-o nga estudyante
router.post("/", createStudent);

router.delete("/:studentId", deleteStudent);

export default router;
