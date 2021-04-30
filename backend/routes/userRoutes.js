import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  registerAdminUser,
  getUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser);
router.route('/admin').post(registerAdminUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
