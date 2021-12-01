'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.hasMany(models.Direccion, {
        as: "direccion",
        foreignKey: "usuarioId"
      })
    }
  };
  Usuario.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    userName: DataTypes.STRING,
    fechaDeNacimiento: DataTypes.DATE,
    subscripcionForja: DataTypes.BOOLEAN,
    admin: DataTypes.BOOLEAN,
    telefono: DataTypes.BIGINT,
    imagen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};