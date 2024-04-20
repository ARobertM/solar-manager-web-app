import Inverter from "../entities/Inverter.js";


async function getAllInverters(){
    try{
        const inverters = await Inverter.findAll();
        return {succes: true, inverters: inverters}
    }catch(error){
        console.error("Error: ", error);
        return {succes : false};
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