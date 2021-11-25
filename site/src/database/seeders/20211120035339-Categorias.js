'use strict';

const categoriasJson = require('../../data/categorias.json');

let categorias = categoriasJson.map(categoriaJson => {
  let categoria = {
    nombre: categoriaJson.nombre,
    createdAt: new Date,
    updatedAt: new Date
  }
  return categoria
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkInsert('Categorias', categorias, {});
   
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('Categorias', null, {});
    
  }
};
