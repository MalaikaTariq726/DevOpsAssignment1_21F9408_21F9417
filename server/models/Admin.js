import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
});

const adminModel = mongoose.model("Admin", adminSchema);
export { adminModel as admin };
