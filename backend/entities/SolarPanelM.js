import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

const SolarPanelM = db.define('SolarPanelM',{
    SolarPanelId:{
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    SolarPanelMMeasurement:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    SolarPanelMYear:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    SolarPanelMMonth:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    SolarPanelMDay:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    SolarPanelMHour:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

export default SolarPanelM;