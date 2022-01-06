module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define(
    "colores",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      color: {
        type: DataTypes.STRING,
      },
      local: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "tbl_colores",
      timestamps: false,
    }
  );

  return Color;
};
