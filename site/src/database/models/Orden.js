'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orden extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Orden.belongsTo(models.Usuario, {
        as: 'ordenUsuarios',
        foreignKey: 'usuarioId'
    })

    Orden.belongsToMany(models.Producto, {
        as: 'ordenProductos',
        through: 'carritos',
        foreignKey: 'ordenId',
        otherKey: 'productoId'
    })
    }
  };
  Orden.init({
    status: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orden',
  });
  return Orden;
};