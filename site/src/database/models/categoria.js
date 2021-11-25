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
      Categoria.belongsTo(models.Producto, {
        as: "categoriaProducto",
        foreignKey: "productoId"
      })
    }
  };
  Categoria.init({
    nombre: DataTypes.STRING,
    productoId: DataTypes.INTEGER,
    createAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Categoria',
  });
  return Categoria;
};