import express from 'express'
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import transactionrouter from './routes/transaction.route.js'
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConnect.js";
import {errorHandlerMiddleware} from './middlewares/errorMiddleware.js';
import cors from 'cors';
dotenv.config();
const app = express();


app.use(cors());

app.use(express.json());
app.use(cookieParser());



// middleware
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
// app.use('/api/propert',propertRouter);
app.use('/api/transaction',transactionrouter);


// error handlers middleware
app.use(errorHandlerMiddleware);


// listen to server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

