module.exports = (sequelize, DataTypes) => {
    const Gmt = sequelize.define(
      "gmt",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        valor_gmt: {
          type: DataTypes.STRING,
        },
        local: {
          type: DataTypes.STRING,
        },
      },
      {
        tableName: "tbl_gmt",
        timestamps: false,
      }
    );
  
    return Gmt;
  };
  