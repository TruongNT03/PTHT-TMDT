"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class subCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      subCategories.belongsTo(models.categories, { foreignKey: "categoryId" });
    }
  }
  subCategories.init(
    {
      name: { type: DataTypes.STRING },
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "subCategories",
      tableName: "subCategories",
    }
  );
  return subCategories;
};
