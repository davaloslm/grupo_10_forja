'use strict';

const Talle = require("../models/Talle");

const arrayTalles = ['M0', 'M1', 'M2', 'M3', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5','0','1','2','3','4','5','6','7','8','9','S','L','M','XL','XXL'];
const talles = []
arrayTalles.forEach(e => {
  let talle = {
    nombre:e,
    createdAt: new Date,
    updatedAt: new Date
  }
  talles.push(talle)
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Talles', talles, {});
   
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Talles', null, {});
    
  }
};
