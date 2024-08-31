export class ObraController {
  constructor({ obraModel }) {
    this.obraModel = obraModel;
  }

  getAll = async (req, res) => {
    const obras = await this.obraModel.getAll();
    return res.json(obras);
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
    try {
      const newObra = await this.obraModel.create({ obra: req.body });
      return res.json(newObra);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await this.obraModel.update({ id, obra: req.body });
      if (!updated) {
        return res.status(404).json({ message: "Obra no encontrada." });
      }
      res.json(updated);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const obra = await this.obraModel.delete({ id });
      if (!obra) {
        return res.status(404).json({ message: "Obra no encontrada." });
      }
      return res.json({ message: "Obra borrada." });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}
