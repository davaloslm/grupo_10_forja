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
        Orden.belongsToMany(models.Usuario, {
            as: 'usuarios',
            foreignKey: 'usuario_id'
        })

        Orden.hasMany(models.Carrito, {
            as: 'carritos',
            foreignKey: 'orden_id'
        })
    }



    return Orden;
};
