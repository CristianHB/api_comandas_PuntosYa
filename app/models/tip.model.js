module.exports = (sequelize, DataTypes) => {
  const Tip = sequelize.define(
    "propina",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      valor: {
        type: DataTypes.STRING,
      },
      local: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "tbl_propina",
      timestamps: false,
    }
  );

  return Tip;
};
