module.exports = (sequelize, DataTypes) => {
  const PaymentGateway = sequelize.define(
    "pasarela_pago",
    {
      nombre: {
        type: DataTypes.STRING,
      },
      id_cliente: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      p_key: {
        type: DataTypes.STRING,
      },
      public_key: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "tbl_pasarela_pago",
      timestamps: false,
    }
  );

  return PaymentGateway;
};
