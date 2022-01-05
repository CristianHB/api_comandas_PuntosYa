module.exports = (sequelize, DataTypes) => {
  const Delivery = sequelize.define(
    "domicilio",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      total: {
        type: DataTypes.STRING,
      },
      local: {
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
