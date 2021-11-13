module.exports = (sequelize, DataTypes) => {
    let alias = "Producto"
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(75),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        descuento: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        envio: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        marca: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        categoria_id: {
            type: DataTypes.INTEGER,
            allowNull: false,            
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    } 
    let config = {
        tableName: 'productos',
        timestamps: true
    }
    const Producto = sequelize.define(alias, cols, config);

    Producto.associate = (models) => {
        Producto.belongsToMany(models.Carrito, {
            as: 'carritos',
            foreignKey: 'producto_id'
        })
     
        Producto.belongsToMany(models.Imagen, {
            as: 'imagenes',
            foreignKey: 'producto_id'
        })
    
        Producto.belongsToMany(models.Venta, {
            as: 'ventas',
            foreignKey: 'producto_id'
        })

        Producto.belongsToMany(models.Color, {
            as: 'colores',
            foreignKey: 'producto_id'
        })

        Producto.belongsToMany(models.TalleNum, {
            as: 'tallesNum',
            foreignKey: 'producto_id'
        })

        Producto.belongsToMany(models.TalleLetra, {
            as: 'tallesLetra',
            foreignKey: 'producto_id'
        })

        Producto.hasMany(models.Categoria, {
            as: 'categorias',
            foreignKey: 'categoria_id'
        })
    }



    return Producto
}
