import express from 'express';
import { AuthController } from '../controllers/auth.js';
import { jwtGuard } from '../middlewares/guards/jwtGuard.js';

const router = express.Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', jwtGuard, authController.logout);

export {
  router
}