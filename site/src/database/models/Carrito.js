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
            as: 'carritosUsuarios',
            foreignKey: 'usuario_id'
        })
     
        Carrito.belongsTo(models.Producto, {
            as: 'carritosProductos',
            foreignKey: 'producto_id'
        })
    
        Carrito.belongsTo(models.Orden, {
            as: 'carritosOrdenes',
            foreignKey: 'orden_id'
        })

    }



    return Carrito
}
