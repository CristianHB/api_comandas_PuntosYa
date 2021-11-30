module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "pedido",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      codigo: {
        type: DataTypes.STRING,
      },
      id_puntos: {
        type: DataTypes.STRING,
      },
      local: {
        type: DataTypes.STRING,
      },
      mensajero: {
        type: DataTypes.STRING,
      },
      cedula: {
        type: DataTypes.STRING,
      },
      forma_pago: {
        type: DataTypes.STRING,
      },
      estado_pago: {
        type: DataTypes.STRING,
      },
      observaciones: {
        type: DataTypes.STRING,
      },
      imagen_recibo: {
        type: DataTypes.STRING,
      },
      cod_articulos: {
        type: DataTypes.STRING,
      },
      monto: {
        type: DataTypes.STRING,
      },
      direccion: {
        type: DataTypes.STRING,
      },
      Id_Pedido_Enc: {
        type: DataTypes.STRING,
      },
      telefono: {
        type: DataTypes.STRING,
      },
      ciudad: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.STRING,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "tbl_pedido",
      timestamps: false,
    }
  );

  return Order;
};
