import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser'; 
import fileUpload from 'express-fileupload'; 
import userRouter from './routes/userRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import {dbConnection} from './database/dbConnection.js';
import {errorMiddleware} from './middlewares/error.js';


// Create an instance of express
const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,  // Fixed spelling here
}));

// Use middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload configuration
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/temp",
    })
);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/job', jobRouter);

dbConnection();

app.use(errorMiddleware);


// Export the app as an ES module
export default app;

