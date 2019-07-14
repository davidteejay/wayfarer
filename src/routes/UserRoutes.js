import express from 'express';

import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const router = express.Router();

router.post('/login', AuthMiddleware.generateToken, UserController.signIn);
router.post('/signup', UserMiddleware.validateUserData, UserMiddleware.checkIfEmailExists, AuthMiddleware.generateToken, UserController.signUp);

export default router;
