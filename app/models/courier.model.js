module.exports = (sequelize, Sequelize) => {
  const Courier = sequelize.define(
    "repartidor",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      cedula: {
        type: Sequelize.STRING,
      },
      local: {
        type: Sequelize.STRING,
      },
      nombres: {
        type: Sequelize.STRING,
      },
      apellidos: {
        type: Sequelize.STRING,
      },
      correo: {
        type: Sequelize.STRING,
      },
      telefono: {
        type: Sequelize.STRING,
      },
      estado: {
        type: Sequelize.STRING,
      },
      id_tienda: {
        type: Sequelize.STRING,
      },
      fecha_creacion: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "tbl_repartidor",
      timestamps: false,
    }
  );

  return Courier;
};
