module.exports = (sequelize, Sequelize) => {
  const Command = sequelize.define(
    "command",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      codigo: {
        type: Sequelize.STRING,
      },
      id_puntos: {
        type: Sequelize.STRING,
      },
      cedula: {
        type: Sequelize.STRING,
      },
      mesa: {
        type: Sequelize.STRING,
      },
      observaciones: {
        type: Sequelize.STRING,
      },
      estado: {
        type: Sequelize.STRING,
      },
      cod_articulos: {
        type: Sequelize.JSON,
      },
      monto: {
        type: Sequelize.STRING,
      },
      fecha_creacion: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "tbl_comanda",
      timestamps: false,
    }
  );

  return Command;
};
