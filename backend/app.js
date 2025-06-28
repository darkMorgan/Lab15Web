const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const medicamentoRoutes = require("./routes/medicamento.routes");
const tipoRoutes = require("./routes/tipo.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/medicamentos", medicamentoRoutes);
app.use("/api/tipos", tipoRoutes);

sequelize.sync().then(() => {
  console.log("Base de datos conectada correctamente");
});

app.listen(3001, () => {
  console.log("Servidor backend escuchando en http://localhost:3001");
});
