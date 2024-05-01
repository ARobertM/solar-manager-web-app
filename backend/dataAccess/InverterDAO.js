import Inverter from "../entities/Inverter.js";


async function getAllInverters(){
  try {
    const inverterData = await Inverter.findAll(); 
    res.json(inverterData);
  } catch (error) {
    console.error("Error fetching inverter data:", error);
    res.status(500).json({ error: 'Failed to retrieve inverter data' });
  }
}

async function getInverterById(id) {
    try {
      const inverter = await Inverter.findByPk(id);
      return { success: true, inverter: inverter };
    } catch (error) {
      console.error("Eroare :", error);
      return { success: false };
    }
  }

async function createInverter(inverter) {
    try {
      const inverterCreated = await Inverter.create(inverter);
      return { success: true, inverter: inverterCreated };
    } catch (error) {
      console.error("Eroare :", error);
      return { success: false };
    }
  }

export {
    getAllInverters,
    getInverterById,
    createInverter,

}