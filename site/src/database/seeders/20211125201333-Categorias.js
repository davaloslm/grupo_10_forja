'use strict';

/* function randomInt(min, max) {
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
}) */

const categoriasJson = require('../../data/categorias.json');

let categoriasArray = categoriasJson.map(categoria => {
  let categorias = {
    nombre: categoria.nombre,
    productoId: categoria.productoId,
    createdAt: new Date,
    updatedAt: new Date
  }
  return categorias
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Categorias', categoriasArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Categorias', null, {});
  }
};
