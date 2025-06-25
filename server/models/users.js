"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.address, {
        foreignKey: "user_id",
      });
      users.hasMany(models.orders, {
        foreignKey: "user_id",
      });
      users.hasMany(models.reviews, {
        foreignKey: "user_id",
      });
      users.hasOne(models.carts, {
        foreignKey: "user_id",
      });
      users.hasMany(models.chat_messages, {
        foreignKey: "from",
      });
      users.hasMany(models.chat_messages, {
        foreignKey: "to",
      });
      users.hasMany(models.chat_rooms, {
        foreignKey: "user_one",
      });
      users.hasMany(models.chat_rooms, {
        foreignKey: "user_two",
      });
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        defaultValue: "LOCAL",
      },
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      password: DataTypes.STRING,
      role: { type: DataTypes.STRING, defaultValue: "user" },
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
