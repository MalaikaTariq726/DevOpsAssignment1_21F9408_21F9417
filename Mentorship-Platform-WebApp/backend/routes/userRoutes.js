import express from "express";
import {
  requestApproval,
  getStudent,
  getMentor,
  getUser,
  updateRole,
} from "../controllers/userController.js";

const router = express.Router();

router.put("/requestApproval", requestApproval);
router.get("/student", getStudent);
router.get("/mentor", getMentor);
router.get('/getUser', getUser);
router.put('/updateRole', updateRole);

export default router;
