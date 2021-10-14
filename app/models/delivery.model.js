module.exports = (sequelize, Sequelize) => {
  const Delivery = sequelize.define(
    "domicilio",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      total: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "tbl_domicilio",
      timestamps: false,
    }
  );

  return Delivery;
};
