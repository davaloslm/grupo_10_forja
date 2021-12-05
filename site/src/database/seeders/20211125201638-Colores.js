'use strict';

/* function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const arrayColores = ['Rojo','Blanco','Violeta','Rosado','Azul','Amarillo', 'Negro', 'Verde claro', 'Verde oscuro', 'Celeste', 'Naranja', 'Gris', 'Fucsia', 'Bordó', 'Marrón', 'Dorado', 'Beige', 'Plateado']
const colores = []
arrayColores.forEach(e => {
  let color = {
    nombre: e,
    productoId: randomInt(1, 48),
    createdAt: new Date,
    updatedAt: new Date
  }
  colores.push(color)
}); */

const coloresJson = require('../../data/colores.json');

let coloresArray = coloresJson.map(color => {
  let colores = {
    nombre: color.nombre,
    productoId: color.productoId,
    createdAt: new Date,
    updatedAt: new Date
  }
  return colores
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Colors', coloresArray, {});

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Colors', null, {});
    
  }
};
