module.exports = (sequelize, Sequelize) => {
  const PaymentGateway = sequelize.define(
    "pasarela_pago",
    {
      nombre: {
        type: Sequelize.STRING,
      },
      id_cliente: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      p_key: {
        type: Sequelize.STRING,
      },
      public_key: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "tbl_pasarela_pago",
      timestamps: false,
    }
  );

  return PaymentGateway;
};
