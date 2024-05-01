import express from 'express'
import {getAllInverters,getInverterById,createInverter} from "../dataAccess/InverterDAO.js";
import Inverter from "../entities/Inverter.js";

let inverterRouter = express.Router();

inverterRouter.post('/register/inverter', async (req, res) => {
    const { success, inverter, error } = await createInverter(req.body);
    if (!success) return res.status(500).json({ error });
    return res.status(201).json({ message: 'Inverter linked successfully', inverter });
});

inverterRouter.get('/inverter-data', async (req, res) => {
    try {
      const inverterData = await Inverter.findAll(); 
      res.json(inverterData);
    } catch (error) {
      console.error("Error fetching inverter data:", error);
      res.status(500).json({ error: 'Failed to retrieve inverter data' });
    }
  });

  inverterRouter.get('/inverter-data', async (req, res) => {
    const { userId, deviceId } = req.query;
    if (!userId || !deviceId) {
        return res.status(400).json({ error: "Missing parameters" });
    }

    try {
        const inverter = await Inverter.findOne({
            where: { UserId: userId, DeviceId: deviceId }
        });

        if (inverter) {
            res.json(inverter);
        } else {
            res.status(404).json({ error: "Inverter not found" });
        }
    } catch (error) {
        console.error("Error fetching inverter data:", error);
        res.status(500).json({ error: 'Failed to retrieve inverter data' });
    }
});


export default inverterRouter;