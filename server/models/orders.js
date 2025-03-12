"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      orders.belongsTo(models.users, { foreignKey: "userId" });
      orders.hasMany(models.orderDetails, { foreignKey: "orderId" });
    }
  }
  orders.init(
    {
      userId: DataTypes.INTEGER,
      totalPrice: DataTypes.FLOAT,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "orders",
    }
  );
  return orders;
};
