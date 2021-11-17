'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Producto.belongsToMany(models.Usuario, {
        as: 'productoCarritoUsuarios',
        through: 'carritos',
        foreignKey: 'producto_id',
        otherKey: 'usuario_id'
    })

    Producto.hasMany(models.Imagen, {
        as: 'productoImagenes',
        foreignKey: 'producto_id'
    })

    Producto.belongsToMany(models.Usuario, {
        as: 'productoVentasUsuarios',
        through: 'ventas',
        foreignKey: 'producto_id',
        otherKey: 'usuario_id'
    })

    Producto.belongsToMany(models.Color, {
        as: 'productoColores',
        through: 'producto_color',
        foreignKey: 'producto_id',
        otherKey: 'color_id'
    })

    Producto.belongsToMany(models.Talle, {
        as: 'productoTalles',
        through: 'producto_talle',
        foreignKey: 'producto_id',
        otherKey: 'talle_id'
    })

    Producto.belongsToMany(models.Categoria, {
        as: 'productoCategorias',
        through: 'producto_categoria',
        foreignKey: 'producto_id',
        otherKey: 'categoria_id'
    })
    }
  };
  Producto.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    descuento: DataTypes.INTEGER,
    envio: DataTypes.BOOLEAN,
    marca: DataTypes.STRING,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};