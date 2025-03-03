import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ssin: { type: Number, required: true, unique: true },
  author: { type: String, required: true },
});

const bookModel = mongoose.model("Book", bookSchema);
export { bookModel as book };
