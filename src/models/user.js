import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Status } from '../constants/index.js';
import { Task } from './task.js';
import logger from '../logs/loger.js';
import { encriptar } from '../common/bycript.js';

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Ingrese nombre de usuario',
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese contraseña',
            }
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: Status.ACTIVE,
        validate: {
            isIn: {
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: `debe ser ${Status.ACTIVE} o ${Status.INACTIVE}`,
            }
        }
    }
});

User.beforeCreate(async (user) => {
    try {
        logger.info('creando');
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña creada');
    }
});

User.beforeUpdate(async (user) => {
    try {
        logger.info('actualizando, siempre encriptando la contraseña');
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña actualizada');
    }
});

// One to Many
User.hasMany(Task);
Task.belongsTo(User);