'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Factura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Factura.belongsTo(models.Usuario, {
        as:"facturaUsuarios",
        foreignKey: "usuarioId"

    })

    Factura.hasMany(models.Venta, {
        as:"facturaVentas",
        foreignKey: "facturaId"

    })
    }
  };
  Factura.init({
    fecha: DataTypes.DATE,
    usuarioId: DataTypes.INTEGER,
    total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Factura',
  });
  return Factura;
};