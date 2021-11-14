module.exports = (sequelize, DataTypes) => {
    let alias = "Factura"

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
        usuario_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total:{
            type: DataTypes.DECIMAL,
            allowNull:false,
        }
        
    }
    let config = {
        tableName: 'Factura',
        timestamps: true
    }
    const Factura = sequelize.define(alias, cols, config);

    Factura.associate = (models) =>{
        Factura.belongsToMany(models.Usuario, {
            as:"usuarios",
            foreignKey: "usuario_id"

        })

        Factura.hasMany(models.Venta, {
            as:"ventas",
            foreignKey: "factura_id"

        })
    }

    return Factura
}