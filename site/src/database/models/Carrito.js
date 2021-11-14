module.exports = (sequelize, DataTypes) => {
    let alias = "Carrito"
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        producto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orden_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    } 
    let config = {
        tableName: 'carritos',
        timestamps: true
    }

    const Carrito = sequelize.define(alias, cols, config);

    Carrito.associate = (models) => {
        Carrito.belongsToMany(models.Usuario, {
            as: 'usuarios',
            foreignKey: 'usuario_id'
        })
     
        Carrito.belongsToMany(models.Producto, {
            as: 'productos',
            foreignKey: 'producto_id'
        })
    
        Carrito.belongsToMany(models.Orden, {
            as: 'ordenes',
            foreignKey: 'orden_id'
        })

    }



    return Carrito
}
