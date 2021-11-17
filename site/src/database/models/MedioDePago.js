'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedioDePago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        MedioDePago.hasMany(models.Venta, {
            as: 'ventas',
            foreignKey: 'medio_de_pago_id'
    })
    }
  };
  MedioDePago.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MedioDePago',
  });
  return MedioDePago;
};