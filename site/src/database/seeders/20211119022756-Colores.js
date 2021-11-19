'use strict';

const arrayColores = ['Rojo','Blanco','Violeta','Rosado','Azul','Amarillo', 'Negro', 'Verde claro', 'Verde oscuro', 'Celeste', 'Naranja', 'Gris', 'Fucsia', 'Bordó', 'Marrón', 'Dorado', 'Beige', 'Plateado']
const colores = []
arrayColores.forEach(e => {
  let color = {
    nombre: e,
  }
  colores.push(color)
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Colores', colores, {});
   
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Colores', null, {});
    
  }
};
