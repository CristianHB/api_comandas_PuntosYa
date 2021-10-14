module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "order",
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
      local: {
        type: Sequelize.STRING,
      },
      cedula: {
        type: Sequelize.STRING,
      },
      tipo: {
        type: Sequelize.STRING,
      },
      mesa: {
        type: Sequelize.STRING,
      },
      forma_pago: {
        type: Sequelize.STRING,
      },
      estado_pago: {
        type: Sequelize.STRING,
      },
      observaciones: {
        type: Sequelize.STRING,
      },
      imagen_recibo: {
        type: Sequelize.STRING,
      },
      cod_articulos: {
        type: Sequelize.JSON,
      },
      monto: {
        type: Sequelize.STRING,
      },
      direccion: {
        type: Sequelize.STRING,
      },
      telefono: {
        type: Sequelize.STRING,
      },
      ciudad: {
        type: Sequelize.STRING,
      },
      estado: {
        type: Sequelize.STRING,
      },
      fecha_creacion: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "tbl_pedido",
      timestamps: false,
    }
  );

  return Order;
};
