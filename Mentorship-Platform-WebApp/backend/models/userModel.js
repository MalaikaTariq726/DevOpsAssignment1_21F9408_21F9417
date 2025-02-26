import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  googleId: { type: String },
  role: { type: String },
  status: {type:String},
});

const userModel = mongoose.model("User", UserSchema);
export { userModel as userdb };
