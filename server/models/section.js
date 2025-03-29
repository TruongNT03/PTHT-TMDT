"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      section.hasMany(models.products, {
        foreignKey: "section_id",
      });
    }
  }
  section.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "sections",
    }
  );
  return section;
};
