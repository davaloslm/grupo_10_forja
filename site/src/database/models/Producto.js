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
        foreignKey: 'productoId',
        otherKey: 'usuarioId'
    })

    Producto.hasMany(models.Imagen, {
        as: 'productoImagenes',
        foreignKey: 'productoId'
    })

    Producto.belongsToMany(models.Usuario, {
        as: 'productoVentasUsuarios',
        through: 'ventas',
        foreignKey: 'productoId',
        otherKey: 'usuarioId'
    })

    Producto.belongsToMany(models.Color, {
        as: 'productoColores',
        through: 'productocolores',
        foreignKey: 'productoId',
        otherKey: 'colorId'
    })

    Producto.belongsToMany(models.Talle, {
        as: 'productoTalles',
        through: 'productoTalles',
        foreignKey: 'productoId',
        otherKey: 'talleId'
    })

    Producto.belongsToMany(models.Categoria, {
        as: 'productoCategorias',
        through: 'productocategorias',
        foreignKey: 'productoId',
        otherKey: 'categoriaId'
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