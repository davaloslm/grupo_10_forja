'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Direcciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      calle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      localidad: {
        type: Sequelize.STRING,
        allowNull: false
      },
      provincia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codigoPostal: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      departamento: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Direcciones');
  }
};