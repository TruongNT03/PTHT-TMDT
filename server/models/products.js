"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      products.hasMany(models.product_variant_values, {
        foreignKey: "product_id",
      });
      products.hasMany(models.order_details, {
        foreignKey: "product_id",
      });
      products.hasMany(models.product_images, {
        foreignKey: "product_id",
      });
      products.hasMany(models.reviews, {
        foreignKey: "product_id",
      });
      products.belongsTo(models.sections, {
        foreignKey: "section_id",
      });
      products.belongsTo(models.categories, {
        foreignKey: "category_id",
      });
    }
  }
  products.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      stock: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      section_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
