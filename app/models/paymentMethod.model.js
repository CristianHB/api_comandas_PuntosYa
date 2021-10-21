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
      estado: {
        type: Sequelize.BOOLEAN,
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
