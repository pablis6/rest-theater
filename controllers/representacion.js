import { readJSON } from "../utils.js";

const { butacas } = readJSON("./statics/plano.json");

export class RepresentacionController {
  constructor({ representacionModel, planoModel }) {
    this.representacionModel = representacionModel;
    this.planoModel = planoModel;
  }

  getAll = async (req, res) => {
    const representaciones = await this.representacionModel.getAll();
    return res.json(representaciones);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const representacion = await this.representacionModel.getById({ id });
    if (!representacion) {
      return res.status(404).json({ message: "Representación no encontrada." });
    }
    return res.json(representacion);
  };

  create = async (req, res) => {
    try {
      const newRepresentacion = await this.representacionModel.create({
        representacion: req.body,
      });

      const plano = {
        representacion: newRepresentacion.id,
        butacas,
      };
      const newPlano = await this.planoModel.create({ plano });

      return res.json(newRepresentacion);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;

      const updated = await this.representacionModel.update({
        id,
        representacion: req.body,
      });
      if (!updated) {
        return res
          .status(404)
          .json({ message: "Representación no encontrada." });
      }
      return res.json(updated);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await this.representacionModel.delete({ id });
      if (!deleted) {
        return res
          .status(404)
          .json({ message: "Representación no encontrada." });
      }
      const planoDeleted = await this.planoModel.deleteFromRepresentacion({
        representacionId: id,
      });
      if (!planoDeleted) {
        return res.status(404).json({ message: "Plano no encontrado." });
      }
      return res.json({ message: "Representación borrada." });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}
