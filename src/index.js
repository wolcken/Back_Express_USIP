import app from "./app.js";
import 'dotenv/config';
import logger from "./logs/loger.js";
import { sequelize } from "./database/database.js";

async function main() {
    // Iniciar sequelize
    await sequelize.sync({ force: false });

    const port = process.env.PORT;
    app.listen(port);
    logger.info(`listening ${port}`);
}

main();