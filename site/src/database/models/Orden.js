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
        as: 'usuarios',
        foreignKey: 'usuario_id'
    })

    Orden.belongsToMany(models.Producto, {
        as: 'productos',
        through: 'carritos',
        foreignKey: 'orden_id',
        otherKey: 'producto_id'
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