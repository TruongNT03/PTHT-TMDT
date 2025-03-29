"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product_images.belongsTo(models.products, {
        foreignKey: "product_id",
      });
    }
  }
  product_images.init(
    {
      product_id: DataTypes.INTEGER,
      path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "product_images",
    }
  );
  return product_images;
};
