module.exports = (sequelize, DataTypes) => {
  const Billing = sequelize.define(
    "Facturacion",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      consecutivo: {
        type: DataTypes.INTEGER,
      },
      id_factura: {
        type: DataTypes.STRING,
      },
      resolucion_dian: {
        type: DataTypes.STRING,
      },
      fecha_autorizada: {
        type: DataTypes.DATE,
      },
      local: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "tbl_facturacion",
      timestamps: false,
    }
  );

  return Billing;
};
