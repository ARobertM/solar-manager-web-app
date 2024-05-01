import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

const Inverter = db.define('Inverter', {
    InverterId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    InverterName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    InverterDateCreated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});

export default Inverter;