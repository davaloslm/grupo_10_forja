module.exports = (sequelize, DataTypes) => {
    let alias = 'Usuario';
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(75),
            allowNull: false,
            unique: true
        },
        contraseña: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        fecha_de_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        subscripcion_forja: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    };
    let config = {
        tableName: 'usuarios',
        timestamps: true
    };

    const Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = (models) => {
        Usuario.belongsToMany(models.Direccion, {
            as: 'usuariosDirecciones',
            through: 'usuario_direccion',
            foreignKey: 'usuario_id',
            otherKey: 'direccion_id'
        })

        Usuario.hasMany(models.Orden, {
            as: 'usuariosOrdenes',
            foreignKey: 'usuario_id'
        })

        Usuario.belongsToMany(models.Producto, {
            as: 'usuariosProductos',
            through: 'ventas',
            foreignKey: 'usuario_id',
            otherKey: 'producto_id'
        })

        Usuario.hasMany(models.Factura, {
            as: 'usuariosFacturas',
            foreignKey: 'usuario_id'
        })

        Usuario.belongsToMany(models.Producto, {
            as: 'usuariosProductos',
            through: 'carritos',
            foreignKey: 'usuario_id',
            otherKey: 'producto_id'
        })

    }



    return Usuario;
};