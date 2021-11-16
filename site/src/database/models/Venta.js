module.exports = (sequelize, DataTypes) => {
    let alias = "Venta"
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        fecha:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        producto_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        usuario_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        medio_de_pago:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        factura_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        total:{
            type: DataTypes.DECIMAL,
            allowNull:false,
        }
        
    }
    let config = {
        tableName: 'ventas',
        timestamps: true
    }
    const Venta = sequelize.define(alias, cols, config);

    Venta.associate = (models) => {
        Venta.belongsTo(models.Producto, {
            as: 'ventasProductos',
            foreignKey: 'producto_id'
        })
        Venta.belongsTo(models.Usuario, {
            as: 'ventasUsuarios',
            foreignKey: 'usuario_id'
        })
        Venta.belongsTo(models.MedioDePago, {
            as: 'ventasMediosDePago',
            foreignKey: 'medio_de_pago_id'
        })
        Venta.belongsTo(models.Factura, {
            as: 'ventasFacturas',
            foreignKey: 'factura_id'
        })
        
    }
    return Venta
}