import { Router } from 'express';
import { getRecords, updateRecord, deleteRecord, postRecord } from '../controllers/recordController.js';
import { validaRegistro } from '../middlewares/recordSchemaValidationMiddleware.js';
import { validaToken } from '../middlewares/authMiddleware.js';

const recordRouter = Router();
recordRouter.use(validaToken)
recordRouter.get("/records", getRecords);
recordRouter.post("/records", validaRegistro, postRecord);
recordRouter.put("/records/:id", validaRegistro, updateRecord);
recordRouter.delete("/records/:id", deleteRecord);
export default recordRouter;