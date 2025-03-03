import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  rollno: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, required: true },
  grade: { type: String, required: true },
});

const studentModel = mongoose.model("Student", studentSchema);
export { studentModel as student };
