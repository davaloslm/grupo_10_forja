'use strict';
const faker = require('faker');

const usuarios = require('../../data/users.json')

let direcciones = []
for (let i = 0; i < usuarios.length; i++) {
    
    let direccion = {
        calle: faker.address.streetName(),
        numero: faker.datatype.number({
            'min': 1,
            'max': 10000
        }),
        localidad: faker.address.cityName(),
        provincia: faker.address.state(),
        codigoPostal: faker.datatype.number({
        'min': 10000,
        'max': 20000
    }),
        departamento: faker.datatype.number({
        'min': 10,
        'max': 50
    })
    }

direcciones.push(direccion)

}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
  await queryInterface.bulkInsert('Direcciones', direcciones, {});
  
  },

  down: async (queryInterface, Sequelize) => {

  await queryInterface.bulkDelete('Direcciones', null, {});
    
  }
};

