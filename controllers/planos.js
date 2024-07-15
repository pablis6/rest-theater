import { validatePartialPlano, validatePlano } from "../schemas/planos.js";
import { readJSON } from "../utils.js";

const { butacas } = readJSON("./statics/plano.json");

export class PlanoController {
  constructor({ planoModel }) {
    this.planoModel = planoModel;
  }

  /**
   * Obtiene todos los planos.
   * @param {Object} req - El objeto de solicitud.
   * @param {Object} res - El objeto de respuesta.
   * @returns {Promise<void>} - Una promesa que se resuelve cuando se envía la respuesta.
   */
  getAll = async (req, res) => {
    const planos = await this.planoModel.getAll();
    res.json(planos);
  };

  /**
   * Obtiene un plano por su ID.
   * @param {Object} req - El objeto de solicitud HTTP.
   * @param {Object} res - El objeto de respuesta HTTP.
   * @returns {Object} - El plano encontrado.
   */
  getById = async (req, res) => {
    const { id } = req.params;
    const plano = await this.planoModel.getById({ id });
    if (!plano) {
      return res.status(404).json({ message: "Plano no encontrado." });
    }
    res.json(plano);
  };

  /**
   * Crea un nuevo plano.
   * @param {Object} req - El objeto de solicitud.
   * @param {Object} res - El objeto de respuesta.
   * @returns {Object} El plano recién creado.
   */
  create = async (req, res) => {
    req.body.butacas = butacas;
    const plano = validatePlano(req.body);

    if (plano.error) {
      return res.status(400).json({ error: JSON.parse(plano.error.message) });
    }
    const newPlano = await this.planoModel.create({
      plano: plano.data,
    });
    res.json(newPlano);
  };

  /**
   * Actualiza un plano al completo
   * @param {Object} req - El objeto de solicitud HTTP.
   * @param {Object} res - El objeto de respuesta HTTP.
   * @returns {Object} - El objeto JSON actualizado.
   */
  update = async (req, res) => {
    const { id } = req.params;
    const plano = validatePartialPlano(req.body);

    if (plano.error) {
      return res.status(400).json({ error: JSON.parse(plano.error.message) });
    }

    const updated = await this.planoModel.update({
      id,
      plano: plano.data,
    });
    if (!updated) {
      return res.status(404).json({ message: "Plano no encontrado." });
    }
    res.json(updated);
  };

  updateSeat = async (req, res) => {
    const { id } = req.params;
    const plano = validatePartialPlano(req.body);

    if (plano.error) {
      return res.status(400).json({ error: JSON.parse(plano.error.message) });
    }

    const updated = await this.planoModel.updateSeat({
      id,
      plano: plano.data,
    });
    if (!updated) {
      return res.status(404).json({ message: "Plano no encontrado." });
    }
    res.json(updated);
  };

  /**
   * Elimina un plano por su ID.
   * @param {Object} req - El objeto de solicitud.
   * @param {Object} res - El objeto de respuesta.
   * @returns {Object} - El objeto de respuesta con un mensaje indicando si el plano fue borrado o no.
   */
  delete = async (req, res) => {
    const { id } = req.params;

    const deleted = await this.planoModel.delete({ id });
    if (!deleted) {
      return res.status(404).json({ message: "Plano no encontrado." });
    }
    return res.json({ message: "Plano borrada." });
  };
}
