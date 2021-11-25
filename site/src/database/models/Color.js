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
            through: 'productocolores',
            foreignKey: 'productoId',
            otherKey: 'colorId'
    })
    }
  };
  Color.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Color',
    tableName: 'colores',
    timestamps: false
  });
  return Color;
};