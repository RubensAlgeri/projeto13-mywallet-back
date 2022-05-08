import { Router } from 'express';
import { getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { validaUsuario } from "../middlewares/userSchemaValidationMiddleware.js"


const userRouter = Router();
userRouter.get("/user", getUser);
userRouter.put("/user", validaUsuario, updateUser);
userRouter.delete("/user", deleteUser);
export default userRouter;