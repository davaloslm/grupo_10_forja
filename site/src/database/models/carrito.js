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
        as: "carritoUsuario",
        foreignKey: "usuarioId"
      })
      Carrito.belongsTo(models.Producto, {
        as: "carritoProducto",
        foreignKey: "productoId"
      })
    }
  };
  Carrito.init({
    usuarioId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: "carritos",
    modelName: 'Carrito',
  });
  return Carrito;
};