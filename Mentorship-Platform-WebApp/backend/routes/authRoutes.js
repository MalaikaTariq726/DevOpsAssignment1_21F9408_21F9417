import express from 'express';
import { 
  login,
  signup,
  forgotPassword,
  logout,
  verifyToken,
} from '../controllers/authController.js';

const router = express.Router();

router.put('/forgotPassword', forgotPassword);
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/verifyToken', verifyToken);


export default router;
