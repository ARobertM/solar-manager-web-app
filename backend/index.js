import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import DB_Init from './entities/DB_init.js';
import createDbRouter from './routes/createDbRoute.js';
import userRouter from './routes/UserRouter.js';
import inverterRouter from './routes/InverterRouter.js';
import influxRouter from './routes/influxDbRouter.js';
import batterymRouter from './routes/BatteryRouter.js';
import solarPanelmRouter from './routes/SolarPanelRouter.js';
import { WebSocketServer } from 'ws';

env.config();
let app = express();

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize the database
DB_Init();
app.use('/api', createDbRouter);
app.use('/api', userRouter);
app.use('/api', inverterRouter);
app.use('/api', influxRouter);
app.use('/api', batterymRouter);
app.use('/api', solarPanelmRouter);

// Endpoint for receiving InfluxDB notifications
app.post('/api/webhook', (req, res) => {
    const notification = req.body;
    console.log('Notification received:', notification);

    // Send the notification to all connected WebSocket clients
    broadcastNotification(notification);

    res.status(200).send({ message: 'Webhook received and processed' });
});

// Setup WebSocket server
const server = app.listen(process.env.PORT || 9000, () => {
    console.log(`Server is running on port ${process.env.PORT || 9000}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {
        console.log(`Message received: ${message}`);
    });

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
    });
});

function broadcastNotification(notification) {
    wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(notification));
        }
    });
}
