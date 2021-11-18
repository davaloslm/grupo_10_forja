'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductoTalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    ProductoTalle.belongsTo(models.Producto, {
        as: 'productoTalleProductos',
        foreignKey: 'producto_id'
    })

    ProductoTalle.belongsTo(models.Talle, {
        as: 'productoTalleCategorias',
        foreignKey: 'talle_id'
    })
    }
  };
  ProductoTalle.init({
    productoId: DataTypes.INTEGER,
    talleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductoTalle',
  });
  return ProductoTalle;
};