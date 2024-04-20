import mysql from "mysql2/promise";
import env from 'dotenv';

import Users from "./Users.js";
import Inverter from "./Inverter.js";
import BatteryM from "./BatteryM.js";
import SolarPanelM from "./SolarPanelM.js";

env.config();

function create_db(){
    let conn;
    mysql.createConnection({
        user:process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        // socketPath : process.env.DB_SOCKET_PATH
    }).then((connection) => {
        conn = connection;
        return conn.query("CREATE DATABASE IF NOT EXISTS solisdb");
    }).then(() => {
        return conn.end();
    }).catch((err) => {
        console.warn(err.stack);
    })
}

function FK_Config(){
    Users.hasMany(Inverter, { as:'Inverter',foreignKey: 'UserId'});
    Inverter.hasMany(BatteryM, {as:'BatteryM',foreignKey: 'InverterId'});
    Inverter.hasMany(SolarPanelM, {as:'SolarPanelM', foreignKey: 'InverterId'});
}

function DB_Init(){
    create_db();
    FK_Config();
}

export default DB_Init;
