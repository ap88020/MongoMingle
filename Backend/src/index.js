import express from 'express';
import cookieParser from 'cookie-parser';
import {connectDB} from './lib/db.js'; 

import dotenv from 'dotenv';
const app = express();


import authRoutes from './routes/auth.route.js';

app.use(express.json());
app.use(cookieParser());

dotenv.config();
app.use('/api/auth/', authRoutes);

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    connectDB();
})