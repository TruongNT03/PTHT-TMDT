"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      sections.hasMany(models.products, { foreignKey: "sectionId" });
    }
  }
  sections.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          is: /^[\p{L}\s]+$/u,
        },
      },
    },
    {
      sequelize,
      modelName: "sections",
    }
  );
  return sections;
};
