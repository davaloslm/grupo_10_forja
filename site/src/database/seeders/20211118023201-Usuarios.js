'use strict';
const usuariosJson = require("../../data/users.json");

let usuarios = usuariosJson.map(usuarioJson =>{
  let usuario = {

    nombre: usuarioJson.nombre,
    apellido: usuarioJson.apellido,
    email: usuarioJson.email,
    contraseña: usuarioJson.contraseña,
    userName: usuarioJson.nombreUsuario,
    fechaDeNacimiento: usuarioJson.fechaDeNac,
    susbscripcionForja: usuarioJson.ofertas,
    admin: usuarioJson.admin,
    telefono: usuarioJson.telefono,
    imagen: usuarioJson.imagen,
    createdAt: new Date,
    updateAt: new Date,
    
  }
})


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
   await queryInterface.bulkInsert('Usuarios', usuarios, {});
   
  },

  down: async (queryInterface, Sequelize) => {

   await queryInterface.bulkDelete('Usuarios', null, {});
    
  }
};
