import express from 'express';
import { 
 requestApproval,getMentor,getStudent
} from '../controllers/userController.js';

const router = express.Router();

router.put('/requestApproval', requestApproval);
router.get('/student', getStudent);
router.get('/mentor', getMentor);


export default router;