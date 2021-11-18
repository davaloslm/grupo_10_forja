'use strict';
const productosJson = require("../../data/productos.json");

let productos = productosJson.map(productoJson =>{
  let producto = {

    nombre: productoJson.nombre,
    descripcion: productoJson.descripcion,
    precio: productoJson.precio,
    descuento: productoJson.descuento,
    envio: productoJson.envioGratis,
    marca: productoJson.marca,
    stock: 10,
    createdAt: new Date,
    updatedAt: new Date
    }

    return producto
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('Productos', productos, {});
   
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkInsert('Productos', null, {});;
    
  }
};
