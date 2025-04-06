import { student } from "../models/Student.js";
import express from "express";

const router = express.Router();

router.post("/addstudent", async (req, res) => {
  try {
    const { rollno, email, password, grade } = req.body;
    const hashedPassword = password
    await student.create({
      rollno,
      email,
      password: hashedPassword,
      grade,
    });
    res.json({ success: true, message: "Student added." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});
router.get("/display", async (req, res) => {
  try {
    const students = await student.find();
    res.json(students);
  } catch (error) {
    console.error("Error fetching student data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as studentRouter };
