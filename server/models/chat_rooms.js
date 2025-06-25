"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chat_rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      chat_rooms.hasMany(models.chat_messages, {
        foreignKey: "chat_room_id",
      });
      chat_rooms.belongsTo(models.users, {
        foreignKey: "user_one",
      });
      chat_rooms.belongsTo(models.users, {
        foreignKey: "user_two",
      });
    }
  }
  chat_rooms.init(
    {
      user_one: DataTypes.INTEGER,
      user_two: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "chat_rooms",
    }
  );
  return chat_rooms;
};
