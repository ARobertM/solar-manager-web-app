
import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

const BatteryM = db.define('BatteryM',{
    BatteryId:{
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    BatteryMMeasurement:{
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    BatteryMYear:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    BatteryMMonth:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    BatteryMDay:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    BatteryMHour:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

export default BatteryM;