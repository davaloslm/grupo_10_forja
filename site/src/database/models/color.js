'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Color.belongsTo(models.Producto, {
        as: "colorProducto",
        foreignKey: "productoId"
      })
    }
  };
  Color.init({
    nombre: DataTypes.STRING,
    productoId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};