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
        suscripcion_forja: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        direccion_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        Usuario.hasMany(models.Direccion, {
            as: 'direcciones',
            foreignKey: 'usuario_id'
        })

        Usuario.hasMany(models.Orden, {
            as: 'ordenes',
            foreignKey: 'usuario_id'
        })

        Usuario.hasMany(models.Venta, {
            as: 'ventas',
            foreignKey: 'usuario_id'
        })

        Usuario.hasMany(models.Factura, {
            as: 'facturas',
            foreignKey: 'usuario_id'
        })

        Usuario.hasMany(models.Carrito, {
            as: 'carritos',
            foreignKey: 'usuario_id'
        })

    }



    return Usuario;
};
