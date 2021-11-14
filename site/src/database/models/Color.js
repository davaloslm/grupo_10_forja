module.exports = (sequelize, DataTypes) => {
    let alias = "Color"
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        producto_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    } 
    let config = {
        tableName: 'colores',
        timestamps: false
    }

    const Color = sequelize.define(alias, cols, config);

    Color.associate = (models) => {
        Color.belongsToMany(models.Producto, {
            as: 'productos',
            foreignKey: 'producto_id'
        })

    }



    return Color
}
