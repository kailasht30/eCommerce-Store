import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  registerAdminUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/admin').post(registerAdminUser);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/:id').delete(protect, admin, deleteUser);

export default router;
