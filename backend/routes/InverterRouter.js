import express from 'express'
import {getAllInverters,getInverterById,createInverter} from "../dataAccess/InverterDAO.js"

let inverterRouter = express.Router();

inverterRouter.post('/register/inverter', async (req, res) => {
    const { success, inverter, error } = await createInverter(req.body);
    if (!success) return res.status(500).json({ error });
    return res.status(201).json({ message: 'Inverter linked successfully', inverter });
});

export default inverterRouter;