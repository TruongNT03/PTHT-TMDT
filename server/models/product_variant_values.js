"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product_variant_values extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product_variant_values.belongsTo(models.products, {
        foreignKey: "product_id",
      });
      product_variant_values.hasOne(models.cart_items, {
        foreignKey: "product_variant_id",
      });
    }
  }
  product_variant_values.init(
    {
      product_id: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      old_price: DataTypes.FLOAT,
      stock: DataTypes.INTEGER,
      sku: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "product_variant_values",
    }
  );
  return product_variant_values;
};
