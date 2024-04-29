import express from 'express';
import { queryApi,fluxQuery1,fluxQuery2,lastEntryQueryS,lastEntryQueryB } from '../influxDBClient.js';

const influxRouter = express.Router();

influxRouter.get('/influxdata-bat', (req, res) => {
    const days = 1;

    queryApi.queryRows(fluxQuery1(days), {
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

influxRouter.get('/influxdata-solp', (req, res) => {
  const days = 1;

  queryApi.queryRows(fluxQuery2(days), {
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

influxRouter.get('/influxdata-solp-last', (req, res) => {
  let lastData = null;

  queryApi.queryRows(lastEntryQueryS(), {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      console.log("Row data:", o);
      lastData = o; 
    },
    error(error) {
      console.error("Query error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to retrieve data' });
      }
      return; 
    },
    complete() {
      console.log('Query completed');
      if (lastData) {
        if (!res.headersSent) {
          res.status(200).json(lastData);
        }
      } else {
        if (!res.headersSent) {
          res.status(404).json({ error: 'No data found' }); 
        }
      }
    },
  });
});

influxRouter.get('/influxdata-bat-last', (req, res) => {
  let lastData = null;

  queryApi.queryRows(lastEntryQueryB(), {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      console.log("Row data:", o);
      lastData = o; 
    },
    error(error) {
      console.error("Query error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to retrieve data' });
      }
      return; 
    },
    complete() {
      console.log('Query completed');
      if (lastData) {
        if (!res.headersSent) {
          res.status(200).json(lastData);
        }
      } else {
        if (!res.headersSent) {
          res.status(404).json({ error: 'No data found' }); 
        }
      }
    },
  });
});

export default influxRouter;