const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TipoMedic = require("./TipoMedic");

const Medicamento = sequelize.define("Medicamento", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idTipoMedic: {
    type: DataTypes.INTEGER,
    references: {
      model: TipoMedic,
      key: "id",
    },
  },
}, {
  tableName: "Medicamento",
  timestamps: false,
});

// Asociación
Medicamento.belongsTo(TipoMedic, { foreignKey: "idTipoMedic" });
TipoMedic.hasMany(Medicamento, { foreignKey: "idTipoMedic" });

module.exports = Medicamento;
