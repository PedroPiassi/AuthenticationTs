import { Router } from "express";
import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";
import { AuthMiddleware } from "./middleware/auth";

const userController = new UserController();
const authController = new AuthController();

export const router = Router();

router.post('/create', userController.store);
router.post('/login', authController.login);
router.post('/auth', AuthMiddleware, authController.auth);

router.get('/users', AuthMiddleware, userController.index);