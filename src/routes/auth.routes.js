import { Router } from "express";
import authControllers from "../controllers/auth.controllers.js";

const router = Router();

router.post('/', authControllers.login);

export default router;