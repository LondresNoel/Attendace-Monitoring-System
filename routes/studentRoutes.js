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

export default router;
