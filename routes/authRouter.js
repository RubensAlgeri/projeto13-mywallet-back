import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import {validaUsuario} from "../middlewares/userSchemaValidationMiddleware.js"

const authRouter = Router();
authRouter.post("/sign-up", validaUsuario, signUp);
authRouter.post("/sign-in", signIn);
export default authRouter;