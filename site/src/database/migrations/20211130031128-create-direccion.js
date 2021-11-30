'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Direccions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      calle: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      localidad: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      provincia: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      codigoPostal: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      departamento: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "Usuarios"
          },
          key: "id"
        },
        onDelete: "cascade"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Direccions');
  }
};