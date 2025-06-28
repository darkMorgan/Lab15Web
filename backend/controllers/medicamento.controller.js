const { Medicamento, TipoMedic } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const meds = await Medicamento.findAll({
      include: {
        model: TipoMedic,
        attributes: ["id", "nombre"],
      },
    });
    res.json(meds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener medicamentos" });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevo = await Medicamento.create(req.body);
    res.json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear medicamento" });
  }
};


exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await Medicamento.update(req.body, {
      where: { id }
    });
    res.json({ message: "Medicamento actualizado", rowsAffected: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar medicamento" });
  }
};


exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await Medicamento.destroy({
      where: { id }
    });
    res.json({ message: "Medicamento eliminado", rowsAffected: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar medicamento" });
  }
};
