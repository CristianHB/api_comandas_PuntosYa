module.exports = (sequelize, DataTypes) => {
  const PaymentGateway = sequelize.define(
    "pasarela_pago",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
      },
      id_cliente: {
        type: DataTypes.STRING,
      },
      p_key: {
        type: DataTypes.STRING,
      },
      public_key: {
        type: DataTypes.STRING,
      },
      local: {
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
