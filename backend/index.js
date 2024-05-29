import express from 'express'
import cors from 'cors'
import env from 'dotenv';
import DB_Init from './entities/DB_init.js';
import createDbRouter from './routes/createDbRoute.js';
import userRouter from './routes/UserRouter.js';
import inverterRouter from './routes/InverterRouter.js';
import influxRouter from './routes/influxDbRouter.js';
import batterymRouter from './routes/BatteryRouter.js';
import solarPanelmRouter from './routes/SolarPanelRouter.js';




let app = express();

env.config();
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  


app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))

// DB init
DB_Init();
app.use('/api',createDbRouter);
app.use('/api',userRouter);
app.use('/api',inverterRouter);
app.use('/api',influxRouter);
app.use('/api',batterymRouter);
app.use('/api',solarPanelmRouter);

let port = process.env.PORT || 9000;
app.listen(port);
console.log("Server is running on port " + port);
