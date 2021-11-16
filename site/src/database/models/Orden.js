module.exports = (sequelize, DataTypes) => {
    let alias = 'Orden';
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }

    };
    let config = {
        tableName: 'ordenes',
        timestamps: true
    };

    const Orden = sequelize.define(alias, cols, config);

    Orden.associate = (models) => {
        Orden.belongsTo(models.Usuario, {
            as: 'odenesUsuarios',
            foreignKey: 'usuario_id'
        })

        Orden.belongsToMany(models.Producto, {
            as: 'odenesProductos',
            through: 'carritos',
            foreignKey: 'orden_id',
            otherKey: 'producto_id'
        })
    }



    return Orden;
};
