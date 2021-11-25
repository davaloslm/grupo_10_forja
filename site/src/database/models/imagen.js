'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Imagen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Imagen.belongsTo(models.Producto, {
        as: "imagenProducto",
        foreignKey: "productoId"
      })
    }
  };
  Imagen.init({
    nombre: DataTypes.STRING,
    productoId: DataTypes.INTEGER,
    createAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Imagen',
  });
  return Imagen;
};