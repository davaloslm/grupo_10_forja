'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carritos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:'Usuarios'
          },
          key:'id'
        }
      },
      productoId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:'Productos'
          },
          key:'id'
        }
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ordenId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:'Ordenes'
          },
          key:'id'
        }
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
    await queryInterface.dropTable('Carritos');
  }
};