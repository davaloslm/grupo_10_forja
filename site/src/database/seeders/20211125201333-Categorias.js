'use strict';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
var categoriasForja = ["TaeKwon-Do", "Boxeo", "Judo", "Jiu-Jitsu", "KickBoxing/MuayThai", "Entrenamiento Funcional/CrossFit"]
const productosJson = require("../../data/productos.json");

let categorias = productosJson.map(e => {
  let categoria = {
    nombre: categoriasForja[randomInt(0, 6)],
    productoId: randomInt(1, 48),
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
