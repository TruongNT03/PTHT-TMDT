"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cartItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cartItems.belongsTo(models.carts, {
        foreignKey: "cartId",
      });
      cartItems.belongsTo(models.products, {
        foreignKey: "productId",
      });
    }
  }
  cartItems.init(
    {
      productId: { type: DataTypes.INTEGER, allowNull: false },
      cartId: { type: DataTypes.INTEGER, allowNull: false },
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cartItems",
    }
  );
  return cartItems;
};
