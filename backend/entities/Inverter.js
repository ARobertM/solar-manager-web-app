import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

const Inverter = db.define('Inverter',{
    InverterId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    InverterName:{
        type: Sequelize.STRING,
        allowNull : false,
    },
    InverterDateCreated:{
        type: Sequelize.DATE,
        allowNull: false,
    }
});

export default Inverter;