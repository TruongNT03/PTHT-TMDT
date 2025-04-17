"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      order_details.belongsTo(models.orders, {
        foreignKey: "order_id",
      });
      order_details.belongsTo(models.product_variant_values, {
        foreignKey: "product_id",
      });
    }
  }
  order_details.init(
    {
      order_id: DataTypes.INTEGER,
      product_variant_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "order_details",
    }
  );
  return order_details;
};
