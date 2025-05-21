"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      address.belongsTo(models.users, {
        foreignKey: "user_id",
      });
      address.belongsTo(models.orders, {
        foreignKey: "address_id",
      });
      address.hasMany(models.orders, {
        foreignKey: "address_id",
      });
    }
  }
  address.init(
    {
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      is_default: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "address",
    }
  );
  return address;
};
