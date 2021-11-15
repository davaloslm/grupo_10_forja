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
        timestamps: false
    }

    const Categoria = sequelize.define(alias, cols, config);

    Categoria.associate = (models) => {
        Categoria.belongsToMany(models.Producto, {
            as: 'productos',
            through: 'producto_categoria',
            foreignKey: 'categoria_id',
            otherKey: 'producto_id'
        })

    }



    return Categoria
}
