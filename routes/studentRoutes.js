import express from "express";
import {
  getAllStudents,
  createStudent,
  deleteStudent,
  updateStudent,
} from "../controllers/studentController.js";

const router = express.Router();

// pag kuha han ngatanan nga estudyante
router.get("/", getAllStudents);

// pag create hin bag-o nga estudyante
router.post("/", createStudent);

// pag delete han student gamit an query parameter para ha ID
router.delete("/", deleteStudent);

// pag update han student information
router.put("/:id", updateStudent);

export default router;
