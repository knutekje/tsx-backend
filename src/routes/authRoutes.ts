import express from 'express';
import { login, register } from '../controllers/authController';
import { authenticateJWT } from '../middleware/authMiddleware';

export const authRoutes = express.Router();


authRoutes.post('/login', login);
authRoutes.post('/register', register);

authRoutes.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'Access granted', user: (req as any).user });
});

export default authRoutes;
