const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TipoMedic = sequelize.define("TipoMedic", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "TipoMedic",
  timestamps: false,
});

module.exports = TipoMedic;
