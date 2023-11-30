

const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      ///Host might need to change depending on your machine
      //Add 'localhost' or '127.0.0.1' to your .env file under HOST 
      //example: HOST='localhost'
      host: process.env.HOST,
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;