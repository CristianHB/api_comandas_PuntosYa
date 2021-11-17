module.exports = (sequelize, Sequelize) => {
  const Tip = sequelize.define(
    "propina",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      valor: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "tbl_propina",
      timestamps: false,
    }
  );

  return Tip;
};
