'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Imagenes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      productoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:{
            tableName:'Productos'
          },
          key:'id'
        },
        onDelete: 'cascade'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Imagenes');
  }
};