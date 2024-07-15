import { validateRepresentacion } from "../schemas/representaciones.js";

export class RepresentacionController {
  constructor({ representacionModel }) {
    this.representacionModel = representacionModel;
  }

  getAll = async (req, res) => {
    const representaciones = await this.representacionModel.getAll();
    res.json(representaciones);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const representacion = await this.representacionModel.getById({ id });
    if (!representacion) {
      return res.status(404).json({ message: "Representación no encontrada." });
    }
    res.json(representacion);
  };

  create = async (req, res) => {
    const representacion = validateRepresentacion(req.body);

    if (representacion.error) {
      return res
        .status(400)
        .json({ error: JSON.parse(representacion.error.message) });
    }
    const newRepresentacion = await this.representacionModel.create({
      representacion: representacion.data,
    });

    res.json({ newRepresentacion });
  };

  update = async (req, res) => {
    const { id } = req.params;
    const representacion = validateRepresentacion(req.body);

    if (representacion.error) {
      return res
        .status(400)
        .json({ error: JSON.parse(representacion.error.message) });
    }

    const updated = await this.representacionModel.update({
      id,
      representacion: representacion.data,
    });
    if (!updated) {
      return res.status(404).json({ message: "Representación no encontrada." });
    }
    res.json(updated);
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const deleted = await this.representacionModel.delete({ id });
    if (!deleted) {
      return res.status(404).json({ message: "Representación no encontrada." });
    }
    return res.json({ message: "Representación borrada." });
  };
}
