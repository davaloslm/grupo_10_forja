'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductoColor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    ProductoColor.belongsTo(models.Producto, {
        as: 'productoColorProductos',
        foreignKey: 'producto_id'
    })

    ProductoColor.belongsTo(models.Color, {
        as: 'productoColorColores',
        foreignKey: 'color_id'
    })
    }
  };
  ProductoColor.init({
    productoId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductoColor',
  });
  return ProductoColor;
};