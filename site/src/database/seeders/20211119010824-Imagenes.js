'use strict';
const productos = require('../../data/productos.json');

let imagenesArray = productos.map(product => {
  let imagen = {
    nombre: product.imagen,
    productoId: product.id
  }
  return imagen
})

/* preguntar a javi o a cris */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
  await queryInterface.bulkInsert('Imagenes', imagenesArray, {});
  
  },

  down: async (queryInterface, Sequelize) => {

  await queryInterface.bulkDelete('Imagenes', null, {});
    
  }
};
