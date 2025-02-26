import express from 'express';
import { 
  login,
  signup,
  updateRole,
  forgotPassword,
  logout,
  verifyToken,
  getUser
} from '../controllers/authController.js';

const router = express.Router();

router.put('/forgotPassword', forgotPassword);
router.put('/updateRole', updateRole);
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/verifyToken', verifyToken);
router.get('/getUser', getUser);

export default router;