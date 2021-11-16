module.exports = (sequelize, DataTypes) => {
    let alias = "UsuarioDireccion"
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        direccion_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    } 
    let config = {
        tableName: 'usuario_direccion',
        timestamps: false
    }

    const UsuarioDireccion = sequelize.define(alias, cols, config);

    UsuarioDireccion.associate = (models) => {
        UsuarioDireccion.belongsTo(models.Usuario, {
            as: 'usuarioDireccionUsuarios',
            foreignKey: 'usuario_id'
        })

        UsuarioDireccion.belongsTo(models.Direccion, {
            as: 'usuarioDireccionDirecciones',
            foreignKey: 'direccion_id'
        })
     
    }

    return UsuarioDireccion
}
