"use strict";
const { Model, or } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      orders.hasMany(models.order_details, {
        foreignKey: "order_id",
      });
      orders.belongsTo(models.users, {
        foreignKey: "user_id",
      });
      orders.belongsTo(models.address, {
        foreignKey: "address_id",
      });
    }
  }
  orders.init(
    {
      user_id: DataTypes.INTEGER,
      total_price: DataTypes.FLOAT,
      status: { type: DataTypes.STRING, defaultValue: "ordered" },
      payment: { type: DataTypes.BOOLEAN, defaultValue: false },
      address_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "orders",
    }
  );
  return orders;
};
