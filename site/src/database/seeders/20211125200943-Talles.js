'use strict';

/* function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const arrayTalles = ['M0', 'M1', 'M2', 'M3', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5','0','1','2','3','4','5','6','7','8','9','S','L','M','XL','XXL'];
const talles = []
arrayTalles.forEach(e => {
  let talle = {
    nombre:e,
    productoId: randomInt(1, 48),
    createdAt: new Date,
    updatedAt: new Date  
  }
  talles.push(talle)
}); */

const tallesJson = require('../../data/talles.json');

let tallesArray = tallesJson.map(talle => {
  let talles = {
    nombre: talle.nombre,
    productoId: talle.productoId,
    createdAt: new Date,
    updatedAt: new Date
  }
  return talles
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Talles', tallesArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Talles', null, {});
  }
};
