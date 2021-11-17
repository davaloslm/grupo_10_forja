'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductoColores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:{
            tableName:'Productos'
          },
          key:'id'
        }
      },
      colorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:{
            tableName:'Colores'
          },
          key:'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProductoColores');
  }
};