'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Usuario.belongsToMany(models.Direccion, {
        as: 'usuarioDirecciones',
        through: 'usuario_direccion',
        foreignKey: 'usuario_id',
        otherKey: 'direccion_id'
    })

    Usuario.hasMany(models.Orden, {
        as: 'usuarioOrdenes',
        foreignKey: 'usuario_id'
    })

    Usuario.belongsToMany(models.Producto, {
        as: 'usuarioVentasProductos',
        through: 'ventas',
        foreignKey: 'usuario_id',
        otherKey: 'producto_id'
    })

    Usuario.hasMany(models.Factura, {
        as: 'usuarioFacturas',
        foreignKey: 'usuario_id'
    })

    Usuario.belongsToMany(models.Producto, {
        as: 'usuarioCarritosProductos',
        through: 'carritos',
        foreignKey: 'usuario_id',
        otherKey: 'producto_id'
    })
    }
  };
  Usuario.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    userName: DataTypes.STRING,
    fechaDeNacimiento: DataTypes.DATE,
    subscripcionForja: DataTypes.INTEGER,
    telefono: DataTypes.STRING,
    imagen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};