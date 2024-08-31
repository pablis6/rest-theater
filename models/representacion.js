import { model } from "mongoose";
import { representacionSchema } from "../schemas/representaciones.js";

export const Representacion = model(
  "Representacion",
  representacionSchema,
  "representaciones"
);

export class RepresentacionModel {
  static getAll() {
    return Representacion.find({}, undefined, {
      populate: ["grupo", "obra"],
    });
  }

  static getById({ id }) {
    return Representacion.findById(id, undefined, {
      populate: ["grupo", "obra"],
    });
  }

  static create({ representacion }) {
    return new Representacion(this.depopulate(representacion))
      .save()
      .then((t) => t.populate(["grupo", "obra"]))
      .then((t) => t);
  }

  static update({ id, representacion }) {
    return Representacion.findByIdAndUpdate(
      id,
      this.depopulate(representacion),
      {
        new: true,
      }
    ).populate(["grupo", "obra"]);
  }

  static delete({ id }) {
    return Representacion.findByIdAndDelete(id);
  }

  static depopulate(representacion) {
    return {
      ...representacion,
      obra: representacion.obra.id,
      grupo: representacion.grupo.id,
    };
  }
}
