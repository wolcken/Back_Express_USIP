import express from 'express'
import morgan from 'morgan';

const app = express()

// Import Routes
import usersRoute from './routes/users.routes.js';
import tasksRoute from './routes/tasks.routes.js';
import authRoute from './routes/auth.routes.js';

// Middelwares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', usersRoute);
app.use('/api/tasks', tasksRoute);
app.use('/api/login', authRoute);

export default app;