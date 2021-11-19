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
        Talle.belongsToMany(models.Producto, {
            as: 'talleProductoTalleProductos',
            through: 'producto_talle',
            foreignKey: 'talle_id',
            otherKey: 'producto_id'
        })
    }
  };
  Talle.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Talle',
  });
  return Talle;
};