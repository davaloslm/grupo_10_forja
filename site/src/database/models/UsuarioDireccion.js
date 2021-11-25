'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsuarioDireccion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    UsuarioDireccion.belongsTo(models.Usuario, {
        as: 'usuarioDireccionUsuarios',
        foreignKey: 'usuarioId'
    })

    UsuarioDireccion.belongsTo(models.Direccion, {
        as: 'usuarioDireccionDirecciones',
        foreignKey: 'direccionId'
    })
    }
  };
  UsuarioDireccion.init({
    usuarioId: DataTypes.INTEGER,
    direccionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsuarioDireccion',
    timestamps: false
  });
  return UsuarioDireccion;
};