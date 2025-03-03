import express from "express";
import { book } from "../models/Book.js";

const router = express.Router();

router.post("/addbook", async (req, res) => {
  try {
    const { name, ssin, author } = req.body;
    if (!name || !ssin || !author) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide All details" });
    }
    const existingBook = await book.findOne({ ssin });
    if (existingBook) {
      return res
        .status(400)
        .json({ success: false, message: "SSIN already exists" });
    }
    const newBook = new book({ name, ssin, author });
    await newBook.save();
    return res.json({ success: true, message: "Book added successfully" });
  } catch (err) {
    console.error("Error:", err);
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Book already exists" });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});
export { router as bookRouter };
