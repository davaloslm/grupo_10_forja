module.exports = (sequelize, DataTypes) => {
    let alias = "TalleLetra"
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
        },
        producto_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
    let config = {
        tableName: 'talleLetra',
        timestamps: false
    }
    const TalleLetra = sequelize.define(alias, cols, config);

    TalleLetra.associate = (models) => {
        TalleLetra.belongsToMany(models.Producto, {
            as: 'productos',
            foreignKey: 'producto_id'
        })
    }
    return TalleLetra
}