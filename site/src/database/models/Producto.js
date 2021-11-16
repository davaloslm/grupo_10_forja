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
        Producto.belongsToMany(models.Usuario, {
            as: 'productosUsuarios',
            through: 'carritos',
            foreignKey: 'producto_id',
            otherKey: 'usuario_id'
        })
     
        Producto.hasMany(models.Imagen, {
            as: 'productosImagenes',
            foreignKey: 'producto_id'
        })
    
        Producto.belongsToMany(models.Usuario, {
            as: 'productosVentasUsuarios',
            through: 'ventas',
            foreignKey: 'producto_id',
            otherKey: 'usuario_id'
        })

        Producto.belongsToMany(models.Color, {
            as: 'productosColores',
            through: 'producto_color',
            foreignKey: 'producto_id',
            otherKey: 'color_id'
        })

        Producto.belongsToMany(models.Talle, {
            as: 'productosTalles',
            through: 'producto_talle',
            foreignKey: 'producto_id',
            otherKey: 'talle_id'
        })

        Producto.belongsToMany(models.Categoria, {
            as: 'productosCategorias',
            through: 'producto_categoria',
            foreignKey: 'producto_id',
            otherKey: 'categoria_id'
        })
    }



    return Producto
}
