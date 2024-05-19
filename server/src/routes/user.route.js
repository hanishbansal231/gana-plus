import { Router } from 'express';
import { getUserProfile, login, logout, register, resetPassword, resetPasswordToken, sendOTP, updateUser } from '../controllers/user.controller.js';

const router = Router();

router.post('/otp', sendOTP);
router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', resetPasswordToken);
router.post('/forgot-password', resetPassword);
router.post('/update-user', updateUser);
router.post('/user-profile', getUserProfile);


export default router;