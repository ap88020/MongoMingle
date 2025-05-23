import express from 'express';
import cookieParser from 'cookie-parser';
import {connectDB} from './lib/db.js'; 
import cors from 'cors';
import { app , server } from './lib/soket.js';

import dotenv from 'dotenv';


import authRoutes from './routes/auth.route.js';
import messageRoute from './routes/message.route.js';

app.use(express.json({limit : '10mb'}));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


dotenv.config();
app.use('/api/auth/', authRoutes);
app.use('/api/messages/', messageRoute);

const port = process.env.PORT;

server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    connectDB();
})