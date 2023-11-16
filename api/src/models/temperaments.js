const { DataTypes} = require('sequelize');

module.exports = (Sequelize) => {

    Sequelize.define('temperaments',{

        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
       
        name:{
          type: DataTypes.STRING,
          allowNull: false,
        },
    });

};