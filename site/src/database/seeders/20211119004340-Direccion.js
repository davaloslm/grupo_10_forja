'use strict';
const faker = require('faker');

let direcciones = {
  calle: faker.address.streetName,
  numero: faker.address.countryCode,
  localidad: faker.address.state,
  provincia: faker.address.cityName,
  codigoPostal: faker.address.countryCode,
  departamento: 'No tiene'
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
  await queryInterface.bulkInsert('Direccion', direcciones, {});
  
  },

  down: async (queryInterface, Sequelize) => {

  await queryInterface.bulkDelete('Direccion', null, {});
    
  }
};

