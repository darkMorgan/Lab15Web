const sequelize = require("../config/database");
const TipoMedic = require("./TipoMedic");
const Medicamento = require("./Medicamento");

module.exports = {
  sequelize,
  TipoMedic,
  Medicamento,
};
