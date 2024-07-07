import { User } from "../models/user.js";
import logger from '../logs/loger.js';
import { Task } from "../models/task.js";

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'password', 'status']
        });
        res.json(users);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        })
    }
}

const createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        logger.info('[userController] createUser:' + username);
        const user = await User.create({
            username,
            password
        });
        res.json(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message
        })
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            attributes: ['username', 'status'],
            where: { id }
        });

        if (!user)
            return res.status(404).json({ message: 'Usuario no encontrado' });

        res.json(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message,
        })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        if (!username || !password)
            return res.status(400).json({ message: 'Falta username o password' });

        logger.info('[userController] updateUser:' + username);

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.username = username;
        user.password = password;

        await user.save();

        res.json(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
}

const activeInactive = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        if (!status)
            return res.status(400).json({ message: 'No existe el status' });

        const user = await User.findByPk(id);

        if (user.status === status)
            return res
                .status(409)
                .json({ message: `El usuario ya se encuentra ${status}` });

        user.status = status;
        await user.save();
        res.json(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.destroy({ where: { id } });
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
}

const getTasksUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            attributes: ['username'],
            where: { id },
            include: [
                {
                    model: Task,
                }
            ]
        })
        res.json(user);
    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            message: error.message,
        });
    }
}

export default {
    getUsers,
    createUser,
    getUser,
    updateUser,
    activeInactive,
    deleteUser,
    getTasksUser,
}