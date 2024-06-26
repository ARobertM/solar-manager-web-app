import express from 'express';
import { queryApi,fluxQueryBatteryStdDev,fluxQueryBatteryMin,fluxQueryBatterySum,fluxQueryBatteryMax,fluxQueryBatteryMean,fluxQuery1,fluxQueryBatteryStats,fluxQuery3,lastEntryQueryS,lastEntryQueryB,fluxQueryMeanB,fluxQueryBattery,lastEntryQueryBatteryPercentage, } from '../influxDBClient.js';
import Inverter from "../entities/Inverter.js";
import Users from "../entities/Users.js";

const influxRouter = express.Router();

const fetchStats = async (query) => {
  const data = await queryApi.collectRows(query);
  return data.length > 0 ? data[0]._value : null;
};

influxRouter.get('/inverter-data/:userId', async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const inverterData = await Inverter.findOne({
      where: { UserId: userId }
    });
    if (inverterData) {
      res.json({ exists: true, inverterData });
    } else {
      res.status(404).json({ exists: false, error: 'No inverter found for this user' });
    }
  } catch (error) {
    console.error("Error fetching inverter data:", error);
    res.status(500).json({ error: 'Failed to retrieve inverter data' });
  }
});

influxRouter.get('/influxdata-battery-stats', async (req, res) => {
  try {
    const [min, max, sum, mean, stddev] = await Promise.all([
      fetchStats(fluxQueryBatteryMin()),
      fetchStats(fluxQueryBatteryMax()),
      fetchStats(fluxQueryBatterySum()),
      fetchStats(fluxQueryBatteryMean()),
      fetchStats(fluxQueryBatteryStdDev())
    ]);

    const stats = { min, max, sum, mean, stddev };

    console.log("Data retrieved successfully: ", stats); // Adăugat pentru debug
    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});


influxRouter.get('/influxdata-solp', (req, res) => {
  let dataResults = [];

  queryApi.queryRows(fluxQuery3(), {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      dataResults.push(o);
    },
    error(error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve data' });
    },
    complete() {
      console.log("Data retrieved successfully: ", dataResults); // Adăugat pentru debug
      res.status(200).json(dataResults);
    },
  });
});

influxRouter.get('/influxdata-battery', (req, res) => {
  let dataResults = [];

  queryApi.queryRows(fluxQueryBattery(), {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      dataResults.push(o);
    },
    error(error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve data' });
    },
    complete() {
      console.log("Data retrieved successfully: ", dataResults); // Adăugat pentru debug
      res.status(200).json(dataResults);
    },
  });
});

influxRouter.get('/influxdata-bat', (req, res) => {
  const days = 1;

  queryApi.queryRows(fluxQuery1(days), {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      //console.log(o);
    },
    error(error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve data' });
    },
    complete() {
      //console.log('Completed');
      res.status(200).send('Data retrieved successfully');
    },
  });
});

influxRouter.get('/influxdata-solp-last', (req, res) => {
  let lastData = null;

  queryApi.queryRows(lastEntryQueryS(), {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      //console.log("Row data:", o);
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
      //console.log('Query completed');
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
      //console.log("Row data:", o);
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
      //console.log('Query completed');
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

influxRouter.get('/influxdata-batperc-last', (req, res) => {
  let lastData = null;

  queryApi.queryRows(lastEntryQueryBatteryPercentage(), {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      //console.log("Row data:", o);
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
      //console.log('Query completed');
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

influxRouter.get('/influxdata-conditional', async (req, res) => {
  const { userId, deviceId } = req.query;

  // Verifică existența inverterului
  const inverter = await Inverter.findOne({ where: { UserId: userId, DeviceId: deviceId } });
  if (!inverter) {
      return res.status(404).json({ error: "No inverter matched the provided userId and deviceId" });
  }

  // Dacă inverterul există, preia datele din InfluxDB
  try {
      const [batteryData, solarData] = await Promise.all([
          queryApi.collectRows(lastEntryQueryB()),
          queryApi.collectRows(lastEntryQueryS())
      ]);
      res.json({ batteryData, solarData });
  } catch (error) {
      console.error("Error fetching real-time data from InfluxDB:", error);
      res.status(500).json({ error: "Failed to retrieve data from InfluxDB" });
  }
});


  


export default influxRouter;