'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Talle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Talle.belongsTo(models.Producto, {
        as: "talleProducto",
        foreignKey: "productoId"
      })
    }
  };
  Talle.init({
    nombre: DataTypes.STRING,
    productoId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Talle',
  });
  return Talle;
};