module.exports = (sequelize, DataTypes) => {
  const PaymentMethod = sequelize.define(
    "metodo_pago",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.BOOLEAN,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "tbl_metodo_pago",
      timestamps: false,
    }
  );

  return PaymentMethod;
};
