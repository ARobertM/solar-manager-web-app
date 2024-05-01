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

  inverterRouter.get('/validate-inverter', async (req, res) => {
    const { userId, device_id } = req.query;

    if (!userId || !device_id) {
        return res.status(400).json({ error: "Missing userId or device_id" });
    }

    try {
        const inverter = await Inverter.findOne({
            where: { UserId: userId }
        });

        if (!inverter) {
            return res.status(404).json({ error: "No inverter found for this user" });
        }

        // Simplistic check: Assume device_id matches InverterName
        if (inverter.InverterName !== device_id) {
            return res.status(403).json({ error: "Inverter and device_id do not match" });
        }

        res.json({ message: "Inverter validated successfully", inverter });
    } catch (error) {
        console.error("Error validating inverter:", error);
        res.status(500).json({ error: 'Failed to validate inverter data' });
    }
});


export default inverterRouter;