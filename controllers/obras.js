import { validateObra } from "../schemas/obras.js";

export class ObraController {
  constructor({ obraModel }) {
    this.obraModel = obraModel;
  }

  getAll = async (req, res) => {
    const obras = await this.obraModel.getAll();
    res.json(obras);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const obra = await this.obraModel.getById({ id });
    if (!obra) {
      return res.status(404).json({ message: "Obra no encontrada." });
    }
    res.json(obra);
  };

  create = async (req, res) => {
    const obra = validateObra(req.body);

    if (obra.error) {
      return res.status(400).json({ error: JSON.parse(obra.error.message) });
    }
    const newObra = await this.obraModel.create({ obra: obra.data });
    res.json(newObra);
  };

  update = async (req, res) => {
    const { id } = req.params;
    const obra = validateObra(req.body);

    if (obra.error) {
      return res.status(400).json({ error: JSON.parse(obra.error.message) });
    }

    const updated = await this.obraModel.update({ id, obra: obra.data });
    if (!updated) {
      return res.status(404).json({ message: "Obra no encontrada." });
    }
    res.json(updated);
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const deleted = await this.obraModel.delete({ id });
    if (!deleted) {
      return res.status(404).json({ message: "Obra no encontrada." });
    }
    return res.json({ message: "Obra borrada." });
  };
}
