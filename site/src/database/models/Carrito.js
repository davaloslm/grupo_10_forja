'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Carrito.belongsTo(models.Usuario, {
        as: 'usuarios',
        foreignKey: 'usuario_id'
    })

    Carrito.belongsTo(models.Producto, {
        as: 'productos',
        foreignKey: 'producto_id'
    })

    Carrito.belongsTo(models.Orden, {
        as: 'ordenes',
        foreignKey: 'orden_id'
    })
    }
  };
  Carrito.init({
    usuarioId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    ordenId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carrito',
  });
  return Carrito;
};