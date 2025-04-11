
import "./db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { adminRouter } from "./Routes/authAdmin.js";
import { studentRouter } from "./Routes/authStudent.js";
import { bookRouter } from "./Routes/authBook.js";

const app = express();
dotenv.config();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/authAdmin", adminRouter);
app.use("/authStudent", studentRouter);
app.use("/authBook", bookRouter);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
