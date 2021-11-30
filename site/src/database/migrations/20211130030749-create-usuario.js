'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      apellido: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      contraseña: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      userName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      fechaDeNacimiento: {
        type: Sequelize.DATE,
        allowNull: false
      },
      subscripcionForja: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      telefono: {
        type: Sequelize.BIGINT(20),
        allowNull: true
      },
      imagen: {
        type: Sequelize.STRING(100),
        allowNull: true
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
    await queryInterface.dropTable('Usuarios');
  }
};