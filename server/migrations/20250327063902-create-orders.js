"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      total_price: {
        type: Sequelize.FLOAT,
      },
      status: {
        type: Sequelize.ENUM("ordered", "prepare", "shipping", "completed"),
        default: "ordered",
      },
      payment: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      address_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "address",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
