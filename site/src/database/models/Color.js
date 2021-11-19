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
        Color.belongsToMany(models.Producto, {
            as: 'colorProductos',
            through: 'producto_color',
            foreignKey: 'producto_id',
            otherKey: 'color_id'
    })
    }
  };
  Color.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};