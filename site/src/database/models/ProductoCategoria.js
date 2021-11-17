'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductoCategoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    ProductoCategoria.belongsTo(models.Producto, {
        as: 'productos',
        foreignKey: 'producto_id'
    })

    ProductoCategoria.belongsTo(models.Categoria, {
        as: 'categorias',
        foreignKey: 'categoria_id'
    })
    }
  };
  ProductoCategoria.init({
    productoId: DataTypes.INTEGER,
    categoriaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductoCategoria',
  });
  return ProductoCategoria;
};