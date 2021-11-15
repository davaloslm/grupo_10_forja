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
        Carrito.belongsTo(models.Usuario, {
            as: 'usuarios',
            foreignKey: 'usuario_id'
        })
     
        Carrito.belongsTo(models.Producto, {
            as: 'productos',
            foreignKey: 'producto_id'
        })
    
        Carrito.belongsTo(models.Orden, {
            as: 'ordenes',
            foreignKey: 'orden_id'
        })

    }



    return Carrito
}
