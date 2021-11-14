module.exports = (sequelize, DataTypes) => {
    let alias = "Imagen"
    
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
        tableName: 'imagenes',
        timestamps: false
    }

    const Imagen = sequelize.define(alias, cols, config);

    Imagen.associate = (models) => {
        Imagen.belongsToMany(models.Producto, {
            as: 'productos',
            foreignKey: 'producto_id'
        })

    }



    return Imagen
}
