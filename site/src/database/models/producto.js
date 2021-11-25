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
      Producto.hasMany(models.Imagen, {
        as: "productoImagen",
        foreignKey: "productoId"
      })

      Producto.hasMany(models.Categoria, {
        as: "productoCategoria",
        foreignKey: "productoId"
      })

      Producto.hasMany(models.Color, {
        as: "productoColor",
        foreignKey: "productoId"
      })

      Producto.hasMany(models.Talle, {
        as: "productoTalle",
        foreignKey: "productoId"
      })
    }
  };
  Producto.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    precio: DataTypes.DECIMAL,
    descuento: DataTypes.INTEGER,
    envio: DataTypes.INTEGER,
    marca: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    createAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};