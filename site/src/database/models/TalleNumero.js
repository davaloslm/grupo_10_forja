module.exports = (sequelize, DataTypes) => {
    let alias = "TalleNumero"
    let cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.INTEGER(1),
            allowNull: false,
        },
        producto_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
    let config = {
        tableName: 'TalleNumero',
        timestamps: false
    }
    const TalleNumero = sequelize.define(alias, cols, config);

    TalleNumero.associate = (models) => {
        TalleNumero.belongsToMany(models.Producto, {
            as: 'productos',
            foreignKey: 'producto_id'
        })
    }
    return TalleNumero
}