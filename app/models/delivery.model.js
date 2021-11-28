module.exports = (sequelize, DataTypes) => {
  const Delivery = sequelize.define(
    "domicilio",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      total: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "tbl_domicilio",
      timestamps: false,
    }
  );

  return Delivery;
};
