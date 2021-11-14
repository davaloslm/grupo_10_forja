module.exports = (sequelize, DataTypes) => {
    let alias = 'Pago';
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(80),
            allowNull: false,
        }

    };
    let config = {
        tableName: 'medios_de_pago',
        timestamps: false
    };

    const Pago = sequelize.define(alias, cols, config);

    Pago.associate = (models) => {
        Pago.hasMany(models.Ventas, {
            as: 'usuarios',
            foreignKey: 'id',
            otherKey: 'medio_de_pago'
        })
    }



    return Pago;
};
