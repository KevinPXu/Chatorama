const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Chatroom extends Model {}

Chatroom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    Blacklist: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "chatroom",
  }
);

module.exports = Chatroom;