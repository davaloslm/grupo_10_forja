module.exports = (sequelize, DataTypes) => {
    let alias = "ProductoColor"
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        producto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        color_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    } 
    let config = {
        tableName: 'producto_color',
        timestamps: false
    }

    const ProductoColor = sequelize.define(alias, cols, config);

    ProductoColor.associate = (models) => {
        ProductoColor.belongsTo(models.Producto, {
            as: 'productos',
            foreignKey: 'producto_id'
        })

        ProductoColor.belongsTo(models.Color, {
            as: 'colores',
            foreignKey: 'color_id'
        })
     
    }

    return ProductoColor
}
