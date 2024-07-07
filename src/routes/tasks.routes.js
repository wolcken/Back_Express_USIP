import { Router } from "express";
import tasksControllers from "../controllers/tasks.controllers.js";
import { authenticateToken } from "../middlewares/authenticate.middleware.js";

const router = Router();

router.route('/')
    .get(authenticateToken, tasksControllers.getTasks)
    .post(authenticateToken, tasksControllers.createTask);

router.route('/:id')
    .get(authenticateToken, tasksControllers.getTask)
    .put(authenticateToken, tasksControllers.updateTask)
    .patch(authenticateToken, tasksControllers.taskDone)
    .delete(authenticateToken, tasksControllers.deleteTask);

export default router;