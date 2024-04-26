import express from 'express';
import { queryApi,fluxQuery } from '../influxDBClient.js';

const influxRouter = express.Router();

influxRouter.get('/influxdata', (req, res) => {
    const days = 30;
    queryApi.queryRows(fluxQuery(days), {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        console.log(o);
      },
      error(error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve data' });
      },
      complete() {
        console.log('Completed');
        res.status(200).send('Data retrieved successfully');
      },
    });
});

export default influxRouter;