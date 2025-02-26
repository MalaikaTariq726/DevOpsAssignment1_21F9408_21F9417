import { userdb } from "../models/userModel.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = "1m";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userdb.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user?.status !== "Approved") {
      return res.status(400).json({ message: "User not approved yet." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 60 * 1000, // 60 sec --> 1m, 1000 --> ms
    });
    res
      .status(200)
      .json({ message: "Logged in successfully.", result: user, token });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ message: "Error during login.", error: error.message });
  }
};

const signup = async (req, res) => {
  const { email, password, role, name } = req.body;
  try {
    let stat = "Approved";
    const existingUser = await userdb.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (role === "Mentor") {
      stat = "Pending";
    }
    const newUser = new userdb({
      email: email,
      password: hashedPassword,
      role: role,
      name: name,
      status: stat,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ message: "User Account Created Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await userdb.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    const updatedUser = await user.save();

    return res.status(200).json({ result: updatedUser });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res, next) => {
  res.clearCookie("token");
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.json({ logout: true });
  });
};
const verifyToken = (req, res) => {
  let token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  try {
    jwt.verify(token, JWT_SECRET);
    return res.status(200).json({ message: "Token is valid", status: true });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token expired or invalid", status: false });
  }
};

export { verifyToken as verifyToken };
export { logout as logout };
export { forgotPassword as forgotPassword };
export { signup as signup };
export { login as login };
