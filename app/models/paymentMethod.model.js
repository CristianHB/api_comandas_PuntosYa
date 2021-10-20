module.exports = (sequelize, Sequelize) => {
  const PaymentMethod = sequelize.define(
    "metodo_pago",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "tbl_metodo_pago",
      timestamps: false,
    }
  );

  return PaymentMethod;
};
