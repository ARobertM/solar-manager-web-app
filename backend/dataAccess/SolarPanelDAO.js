import SolarPanelM from '../entities/SolarPanelM.js';

async function getAllSolarPanelM(){
    try{
        const solarm = await SolarPanelM.findAll();
        return {succes: true, solarm: solarm}
    }catch(error){
        console.error("Error: ", error);
        return {succes : false};
    }
}

async function getSolarPanelMById(id) {
    try {
      const solarm = await SolarPanelM.findByPk(id);
      return { success: true, solarm: solarm };
    } catch (error) {
      console.error("Eroare :", error);
      return { success: false };
    }
  }

async function createSolarPanelM(solarm) {
    try {
      const solarmCreated = await SolarPanelM.create(solarm);
      return { success: true, solarm: solarmCreated };
    } catch (error) {
      console.error("Eroare :", error);
      return { success: false };
    }
  }

export {
    getAllSolarPanelM,
    getSolarPanelMById,
    createSolarPanelM,
}