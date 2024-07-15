import { validateGrupo } from "../schemas/grupos.js";

export class GrupoController {
  constructor({ grupoModel }) {
    this.grupoModel = grupoModel;
  }

  getAll = async (req, res) => {
    const grupos = await this.grupoModel.getAll();
    res.json(grupos);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const grupo = await this.grupoModel.getById({ id });
    if (!grupo) {
      return res.status(404).json({ message: "Grupo no encontrado." });
    }
    res.json(grupo);
  };

  create = async (req, res) => {
    const grupo = validateGrupo(req.body);

    if (grupo.error) {
      return res.status(400).json({ error: JSON.parse(grupo.error.message) });
    }
    const newGrupo = await this.grupoModel.create({ grupo: grupo.data });
    res.json(newGrupo);
  };

  update = async (req, res) => {
    const { id } = req.params;
    const grupo = validateGrupo(req.body);

    if (grupo.error) {
      return res.status(400).json({ error: JSON.parse(grupo.error.message) });
    }

    const updated = await this.grupoModel.update({ id, grupo: grupo.data });
    if (!updated) {
      return res.status(404).json({ message: "Grupo no encontrado." });
    }
    res.json(updated);
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const deleted = await this.grupoModel.delete({ id });
    if (!deleted) {
      return res.status(404).json({ message: "Grupo no encontrado." });
    }
    return res.json({ message: "Grupo borrado." });
  };
}
