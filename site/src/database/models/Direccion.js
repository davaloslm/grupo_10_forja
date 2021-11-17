'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Direccion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Direccion.belongsToMany(models.Usuario, {
            as: 'direccionUsuarios',
            through: "usuario_direccion",
            foreignKey: 'direccion_id',
            otherKey: 'usuario_id'
    })
    }
  };
  Direccion.init({
    calle: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    localidad: DataTypes.STRING,
    provincia: DataTypes.STRING,
    codigoPostal: DataTypes.INTEGER,
    departamento: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Direccion',
  });
  return Direccion;
};