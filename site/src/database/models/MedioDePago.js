module.exports = (sequelize, DataTypes) => {
    let alias = 'MedioDePago';
    
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

    const MedioDePago = sequelize.define(alias, cols, config);

    MedioDePago.associate = (models) => {
        MedioDePago.hasMany(models.Venta, {
            as: 'ventas',
            foreignKey: 'medio_de_pago_id'
        })
    }



    return MedioDePago;
};
