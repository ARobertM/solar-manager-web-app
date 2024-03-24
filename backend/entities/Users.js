
import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

const Users = db.define('Users',{
    UserId:{
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    UserName : {
        type:Sequelize.STRING,  
        allowNull: false,
    },
    UserEmail : {
        type: Sequelize.STRING,
        allowNull : false,
    },
    UserPassword : {
        type: Sequelize.STRING,
        allowNull:false,
    },
});

export default Users;