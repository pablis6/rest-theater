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
   * Obtiene un plano por el ID de su representacion.
   * @param {Object} req - El objeto de solicitud HTTP.
   * @param {Object} res - El objeto de respuesta HTTP.
   * @returns {Object} - El plano encontrado.
   */
  getById = async (req, res) => {
    const { id } = req.params;
    const plano = await this.planoModel.getByRepresentacionId({ id });
    if (!plano) {
      return res.status(404).json({ message: "Plano no encontrado." });
    }
    res.json(plano);
  };

  getNameSeats = async (req, res) => {
    const { id } = req.params;
    const nameSeats = await this.planoModel.getNameSeats({ id });
    if (!nameSeats) {
      return res.status(404).json({ message: "Plano no encontrado." });
    }
    res.json(nameSeats[0].asignadoA);
  };

  getOccupiedSeats = async (req, res) => {
    const { id } = req.params;
    const occupiedSeats = await this.planoModel.getOccupiedSeats({ id });
    if (!occupiedSeats) {
      return res.status(404).json({ message: "Plano no encontrado." });
    }
    res.json(occupiedSeats);
  };

  /**
   * Crea un nuevo plano.
   * @param {Object} req - El objeto de solicitud.
   * @param {Object} res - El objeto de respuesta.
   * @returns {Object} El plano recién creado.
   */
  create = async (req, res) => {
    try {
      req.body.butacas = butacas;
      const newPlano = await this.planoModel.create({ plano: req.body });
      return res.json(newPlano);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  /**
   * Actualiza un plano al completo
   * @param {Object} req - El objeto de solicitud HTTP.
   * @param {Object} res - El objeto de respuesta HTTP.
   * @returns {Object} - El objeto JSON actualizado.
   */
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await this.grupoModel.update({ id, grupo: req.body });
      if (!updated) {
        return res.status(404).json({ message: "Plano no encontrado." });
      }
      return res.json(updated);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  updateSeat = async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await this.planoModel.updateSeat({
        id,
        butacas: req.body,
      });
      if (!updated) {
        return res.status(404).json({ message: "Plano no encontrado." });
      }
      return res.json(updated);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  /**
   * Elimina un plano por su ID.
   * @param {Object} req - El objeto de solicitud.
   * @param {Object} res - El objeto de respuesta.
   * @returns {Object} - El objeto de respuesta con un mensaje indicando si el plano fue borrado o no.
   */
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const grupo = await this.planoModel.delete({ id });

      if (!grupo) {
        return res.status(404).json({ message: "Plano no encontrado." });
      }
      return res.json({ message: "Plano borrado." });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };
}
