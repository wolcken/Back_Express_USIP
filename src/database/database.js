import { Sequelize } from "sequelize";
import 'dotenv/config';

export const sequelize = new Sequelize(
    process.env.DB_DATABASE, // db name
    process.env.USER, // username
    process.env.PASSWORD, // password
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECTIC,
        logging: console.log,
    }
);