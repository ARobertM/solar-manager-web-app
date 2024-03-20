import mysql from "mysql2/promise";
import env from 'dotenv';

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

// function FK_Config(){
//     // 1-n , n-n
// }

function DB_Init(){
    create_db();
    // FK_Config();
    
}

export default DB_Init;
