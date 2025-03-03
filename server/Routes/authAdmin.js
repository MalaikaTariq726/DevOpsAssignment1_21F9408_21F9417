import { admin } from "../models/Admin.js";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = password;
    await admin.create({
      username,
      email,
      password: hashedPassword,
    });
    res.json({ success: true, message: "Registered." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = password == user.password;
    if (passwordMatch) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1m' }
      );
    
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 60 * 1000, 
      });

      return res.status(200).json({ message: "Login successful", user });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error occurred during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/verifyToken", (req, res) => {
  let token  = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ message: "Token is valid", status: true });
  } catch (error) {
    console.error("Auth error:", error); 
    return res
      .status(202)
      .json({ message: "Token expired or invalid", status: false });
  }
});

export { router as adminRouter };
