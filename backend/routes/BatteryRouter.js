import express from 'express'
import {getAllBatteryM,getBatteryMById,createBatteryM} from "../dataAccess/BatteryDAO.js"

let batterymRouter = express.Router();

batterymRouter.post('/add/batterym', async (req, res) => {
    const { success, batterym, error } = await createBatteryM(req.body);
    if (!success) return res.status(500).json({ error });
    return res.status(201).json({ message: 'Inverter linked successfully', batterym });
});

export default batterymRouter;