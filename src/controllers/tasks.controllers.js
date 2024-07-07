import logger from "../logs/loger.js";
import { Task } from "../models/task.js";
import { User } from "../models/user.js";

const getTasks = async (req, res) => {
    const { userID } = req.user;

    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'done'],
            order: [['name', 'ASC']],
            where: {
                userId: userID,
            }
        });
        res.json(tasks);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
}

const createTask = async (req, res) => {
    const { name } = req.body;
    const { userID } = req.user;

    if (!name) {
        return res.status(400).json({ message: 'Task name is required' });
    }

    try {
        const task = await Task.create({
            name,
            userId: userID,
        });
        res.json(task);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
}

const getTask = async (req, res) => {
    const { id } = req.params;
    const { userID } = req.user;
    try {
        const task = await Task.findOne({
            attributes: ['name', 'done'],
            where: {
                id,
                userId: userID,
            }
        });
        res.json(task);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { userID } = req.user;
    const { name } = req.body;
    try {
        const task = await Task.update(
            {
                name,
            },
            {
                where: {
                    id,
                    userId: userID,
                }
            }
        );
        if (task[0] === 0)
            return res.status(404).json({ message: 'La tarea no se encuentra' });

        res.json(task);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
}

const taskDone = async (req, res) => {
    const { id } = req.params;
    const { userID } = req.user;
    const { done } = req.body;
    try {
        const task = await Task.update(
            {
                done,
            },
            {
                where: {
                    id,
                    userId: userID
                }
            }
        );
        if (task[0] === 0)
            return res.status(404).json({ message: 'La tarea no se encuentra' });

        res.json(task);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.destroy({ where: { id } })
        return res.json(204);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
}

export default {
    getTasks,
    createTask,
    getTask,
    updateTask,
    taskDone,
    deleteTask,
};
