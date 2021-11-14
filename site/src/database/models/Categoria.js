module.exports = (sequelize, DataTypes) => {
    let alias = "Categoria"
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    } 
    let config = {
        tableName: 'categorias',
        timestamps: true
    }

    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = (models) => {
        Categoria.hasMany(models.Producto, {
            as: 'productos',
            foreignKey: 'categoria_id'
        })

    }



    return Producto
}
