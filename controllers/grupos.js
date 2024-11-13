export class GrupoController {
  constructor({ grupoModel }) {
    this.grupoModel = grupoModel;
  }

  getAll = async (req, res) => {
    const grupos = await this.grupoModel.getAll();
    return res.json(grupos);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const grupo = await this.grupoModel.getById({ id });
    if (!grupo) {
      return res.status(404).json({ message: "Grupo no encontrado." });
    }
    return res.json(grupo);
  };

  create = async (req, res) => {
    try {
      const newGrupo = await this.grupoModel.create({ grupo: req.body });
      return res.json(newGrupo);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await this.grupoModel.update({ id, grupo: req.body });
      if (!updated) {
        return res.status(404).json({ message: "Grupo no encontrado." });
      }
      return res.json(updated);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const grupo = await this.grupoModel.delete({ id });
      if (!grupo) {
        return res.status(404).json({ message: "Grupo no encontrado." });
      }
      return res.json({ message: "Grupo borrado." });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}
