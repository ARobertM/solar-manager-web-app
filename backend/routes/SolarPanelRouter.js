import express from 'express'
import {getAllSolarPanelM,getSolarPanelMById,createSolarPanelM} from "../dataAccess/SolarPanelDAO.js"

let solarPanelmRouter = express.Router();

solarPanelmRouter.post('/register/solarPanelm', async (req, res) => {
    const { success, solarPanelm, error } = await createSolarPanelM(req.body);
    if (!success) return res.status(500).json({ error });
    return res.status(201).json({ message: 'Solar panel linked successfully', solarPanelm });
});

export default solarPanelmRouter;