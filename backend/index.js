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
import axios from 'axios';

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


const sendPushNotification = async (title, message) => {
    try {
        const response = await axios.post('https://app.nativenotify.com/api/notification', {
            appId: 21585,
            appToken: 'DG5QuGxf7EJltyy0HjAyxT',
            title: title,
            message: message,
        });
        console.log('Push notification sent:', response.data);
    } catch (error) {
        console.error('Error sending push notification:', error);
    }
};

app.post('/api/webhook', (req, res) => {
    const notification = req.body;
    console.log('Notification received:', notification);

    const title = notification.labels.checkName || 'New Alert';
    const message = notification.annotations.summary || 'You have a new notification';

    broadcastNotification(notification);

    sendPushNotification(title, message);

    res.status(200).send({ message: 'Webhook received and processed' });
});

const server = app.listen(process.env.PORT || 9000, () => {
    console.log(`Server is running on port ${process.env.PORT || 9000}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {
        console.log(`Message received: ${message}`);

        let notification;
        try {
            notification = JSON.parse(message);
        } catch (error) {
            console.error('Invalid JSON received:', message);
            return;
        }

        const title = notification.labels.checkName || 'New Alert';
        const messageContent = notification.annotations.summary || 'You have a new notification';

        console.log('Notification details:', notification);

        
        broadcastNotification(notification);

        sendPushNotification(title, messageContent);
    });

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
    });
});

function broadcastNotification(notification) {
    wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            console.log('Sending notification to client:', JSON.stringify(notification));
            client.send(JSON.stringify(notification));
        }
    });
}
