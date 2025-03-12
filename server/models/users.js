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
      users.hasMany(models.address, { foreignKey: "userId" });
      users.hasOne(models.carts, { foreignKey: "userId" });
      users.hasMany(models.orders, { foreignKey: "userId" });
      users.hasMany(models.reviews, { foreignKey: "userId" });
    }
  }
  users.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        validate: {},
      },
      lastName: {
        type: DataTypes.STRING,
        validate: {},
      },
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        values: ["ADMIN", "USER"],
        defaultValue: "USER",
      },
      avatar: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
