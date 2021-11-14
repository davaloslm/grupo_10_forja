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
        tableName: 'Ventas',
        timestamps: true
    }
    const Venta = sequelize.define(alias, cols, config);

    Venta.associate = (models) => {
        Venta.belongsToMany(models.Producto, {
            as: 'productos',
            foreignKey: 'producto_id'
        })
        Venta.belongsToMany(models.Usuario, {
            as: 'usuarios',
            foreignKey: 'usuario_id'
        })
        Venta.belongsToMany(models.MedioDePago, {
            as: 'medioDePago',
            foreignKey: 'medio_de_pago_id'
        })
        Venta.belongsToMany(models.Factura, {
            as: 'facturas',
            foreignKey: 'factura_id'
        })
        
    }
    return Venta
}