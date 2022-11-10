const Sequelize = require("sequelize");
require("dotenv").config();
//creates a connection between the environmental variables and sequelize to login onto the mysql database which hides our sensitive information
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
      }
    );

module.exports = sequelize;
