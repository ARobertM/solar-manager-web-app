import express from 'express'
import cors from 'cors'
import env from 'dotenv';
import DB_Init from './entities/DB_init.js';
import createDbRouter from './routes/createDbRoute.js';
import userRouter from './routes/UserRouter.js';
import inverterRouter from './routes/InverterRouter.js';


let app = express();

env.config();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))

// DB init
DB_Init();
app.use('/api',createDbRouter);
app.use('/api',userRouter);
app.use('/api',inverterRouter);

let port = process.env.PORT || 9000;
app.listen(port);
console.log("Server is running on port " + port);
