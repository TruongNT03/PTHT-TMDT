"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class variant_values extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      variant_values.belongsTo(models.variants, {
        foreignKey: "variant_id",
      });
    }
  }
  variant_values.init(
    {
      name: DataTypes.STRING,
      variant_id: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "variant_values",
    }
  );
  return variant_values;
};
