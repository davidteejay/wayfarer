import express from 'express';

import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';

const router = express.Router();

router.post('/signin', UserController.signIn);
router.post('/signup', UserMiddleware.validateUserData, UserMiddleware.checkIfEmailExists, UserController.signUp);

export default router;
