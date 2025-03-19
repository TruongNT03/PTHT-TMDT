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
      products.hasMany(models.orderDetails, { foreignKey: "productId" });
      products.hasMany(models.reviews, { foreignKey: "productId" });
      products.hasOne(models.cartItems, { foreignKey: "productId" });
      products.belongsTo(models.subCategories, { foreignKey: "subCategoryId" });
      products.belongsTo(models.sections, { foreignKey: "sectionId" });
    }
  }
  products.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      stock: DataTypes.INTEGER,
      image: DataTypes.STRING,
      subCategoryId: DataTypes.INTEGER,
      sectionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
