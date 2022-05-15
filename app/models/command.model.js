module.exports = (sequelize, DataTypes) => {
  const Command = sequelize.define(
    "comanda",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codigo: {
        type: DataTypes.INTEGER,
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
      nombre: {
        type: DataTypes.STRING,
      },
      a_nombre_de: {
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
      forma_pago: {
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
      Id_Pedido_Enc: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "tbl_comanda",
      timestamps: false,
    }
  );

  return Command;
};
