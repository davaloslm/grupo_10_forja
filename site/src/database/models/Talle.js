module.exports = (sequelize, DataTypes) => {
    let alias = "Talle"
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING(3),
            allowNull: false,
        }
    }
    let config = {
        tableName: 'talles',
        timestamps: false
    }
    const Talle = sequelize.define(alias, cols, config);

    Talle.associate = (models) => {
        Talle.belongsToMany(models.Producto, {
            as: 'tallesProductos',
            through: 'producto_talle',
            foreignKey: 'talle_id',
            otherKey: 'producto_id'
        })
    }
    return Talle
}