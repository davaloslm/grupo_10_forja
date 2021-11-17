'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categoria.belongsToMany(models.Producto, {
        as: 'categoriaProductos',
        through: 'producto_categoria',
        foreignKey: 'categoria_id',
        otherKey: 'producto_id'
    })
    }
  };
  Categoria.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
  });
  return Categoria;
};
