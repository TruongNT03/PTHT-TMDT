"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chat_messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      chat_messages.belongsTo(models.users, {
        foreignKey: "from",
      });
      chat_messages.belongsTo(models.users, {
        foreignKey: "to",
      });
    }
  }
  chat_messages.init(
    {
      msg: DataTypes.STRING,
      from: DataTypes.INTEGER,
      to: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "chat_messages",
    }
  );
  return chat_messages;
};
