import BatteryM from '../entities/BatteryM.js';

async function getAllBatteryM(){
    try{
        const batterym = await BatteryM.findAll();
        return {succes: true, batterym: batterym}
    }catch(error){
        console.error("Error: ", error);
        return {succes : false};
    }
}

async function getBatteryMById(id) {
    try {
      const batterym = await BatteryM.findByPk(id);
      return { success: true, batterym: batterym };
    } catch (error) {
      console.error("Eroare :", error);
      return { success: false };
    }
  }

async function createBatteryM(batterym) {
    try {
      const batterymCreated = await BatteryM.create(batterym);
      return { success: true, batterym: batterymCreated };
    } catch (error) {
      console.error("Eroare :", error);
      return { success: false };
    }
  }

export {
    getAllBatteryM,
    getBatteryMById,
    createBatteryM,
}