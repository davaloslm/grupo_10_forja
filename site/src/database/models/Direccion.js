module.exports = (sequelize, DataTypes) => {
    let alias = 'Direccion';
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        calle: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        localidad: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        provincia: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        codigo_postal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        departamento: {
            type: DataTypes.STRING(100),
            allowNull: true,
        }

    };
    let config = {
        tableName: 'direcciones',
        timestamps: false
    };

    const Direccion = sequelize.define(alias, cols, config);

    Direccion.associate = (models) => {
        Direccion.belongsToMany(models.Usuario, {
            as: 'usuarios',
            foreignKey: 'usuario_id'
        })
    }



    return Direccion;
};
