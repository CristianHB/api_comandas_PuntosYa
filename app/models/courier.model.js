module.exports = (sequelize, DataTypes) => {
  const Courier = sequelize.define(
    "repartidor",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      cedula: {
        type: DataTypes.STRING,
      },
      local: {
        type: DataTypes.STRING,
      },
      nombres: {
        type: DataTypes.STRING,
      },
      apellidos: {
        type: DataTypes.STRING,
      },
      correo: {
        type: DataTypes.STRING,
      },
      telefono: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.STRING,
      },
      id_tienda: {
        type: DataTypes.STRING,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "tbl_repartidor",
      timestamps: false,
    }
  );

  return Courier;
};
