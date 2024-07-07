import { Router } from "express";
import usersControllers from "../controllers/users.controllers.js";
import { authenticateToken } from "../middlewares/authenticate.middleware.js";

const router = Router();

router
    .route('/')
    .get(usersControllers.getUsers)
    .post(usersControllers.createUser);

router
    .route('/:id')
    .get(usersControllers.getUser)
    .put(usersControllers.updateUser)
    .delete(usersControllers.deleteUser)
    .patch(usersControllers.activeInactive);

router.get('/:id/tasks', authenticateToken, usersControllers.getTasksUser);

export default router;