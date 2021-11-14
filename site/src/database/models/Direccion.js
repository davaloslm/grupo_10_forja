module.exports = (sequelize, DataTypes) => {
    let alias = 'Direccion';
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        calle: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        localidad: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        provincia: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        codigo_postal: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        departamento: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }

    };
    let config = {
        tableName: 'direcciones',
        timestamps: false
    };

    const Direccion = sequelize.define(alias, cols, config);

    Direccion.associate = (models) => {
        Direccion.hasMany(models.Usuario, {
            as: 'usuarios',
            foreignKey: 'usuario_id',
            otherKey: 'direccion_id'
        })
    }



    return Direccion;
};
