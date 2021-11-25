'use strict';
const imagenes = require('../../data/imagenes.json');

let imagenesArray = imagenes.map(imagen => {
  let imagenes = {
    nombre: imagen.nombre,
    productoId: imagen.producto_id,
    createdAt: new Date,
    updatedAt: new Date
  }
  return imagenes
})


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
  await queryInterface.bulkInsert('Imagenes', imagenesArray, {});
  
  },

  down: async (queryInterface, Sequelize) => {

  await queryInterface.bulkDelete('Imagenes', null, {});
    
  }
};
