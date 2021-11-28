module.exports = (sequelize, DataTypes) => {
  const Command = sequelize.define(
    "comanda",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      codigo: {
        type: DataTypes.STRING,
      },
      local: {
        type: DataTypes.STRING,
      },
      id_puntos: {
        type: DataTypes.STRING,
      },
      cedula: {
        type: DataTypes.STRING,
      },
      mesa: {
        type: DataTypes.STRING,
      },
      observaciones: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.STRING,
      },
      cod_articulos: {
        type: DataTypes.STRING,
      },
      monto: {
        type: DataTypes.STRING,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "tbl_comanda",
      timestamps: false,
    }
  );

  return Command;
};
