module.exports = (sequelize, DataTypes) => {
    let alias = "ProductoCategoria"
    
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
        categoria_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    } 
    let config = {
        tableName: 'producto_categoria',
        timestamps: false
    }

    const ProductoCategoria = sequelize.define(alias, cols, config);

    ProductoCategoria.associate = (models) => {
        ProductoCategoria.belongsTo(models.Producto, {
            as: 'productos',
            foreignKey: 'producto_id'
        })

        ProductoCategoria.belongsTo(models.Categoria, {
            as: 'categorias',
            foreignKey: 'categoria_id'
        })
     
    }

    return ProductoCategoria
}
