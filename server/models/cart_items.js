"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cart_items.belongsTo(models.carts, {
        foreignKey: "cart_id",
      });
      cart_items.belongsTo(models.products, {
        foreignKey: "product_id",
      });
    }
  }
  cart_items.init(
    {
      product_id: DataTypes.INTEGER,
      cart_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cart_items",
    }
  );
  return cart_items;
};
