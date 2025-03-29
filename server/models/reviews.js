"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reviews.belongsTo(models.users, {
        foreignKey: "user_id",
      });
      reviews.belongsTo(models.products, {
        foreignKey: "product_id",
      });
    }
  }
  reviews.init(
    {
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "reviews",
    }
  );
  return reviews;
};
