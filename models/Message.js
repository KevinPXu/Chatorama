const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        chatroom_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'chatroom',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: true,
        createdAt: 'createdDate',
        updatedAt: false,
        underscored: true,
        modelName: 'message'
    }
);

module.exports = Message;