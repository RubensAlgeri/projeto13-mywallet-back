import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./recordRouter.js";

const router = Router();
router.use(authRouter);
router.use(userRouter);
export default router;