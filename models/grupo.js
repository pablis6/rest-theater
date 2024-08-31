import { model } from "mongoose";
import { grupoSchema } from "../schemas/grupos.js";

export const Grupo = model("Grupo", grupoSchema);

export class GrupoModel {
  static getAll() {
    return Grupo.find({});
  }

  static getById({ id }) {
    return Grupo.findById(id);
  }

  static create({ grupo }) {
    return new Grupo(grupo).save();
  }

  static update({ id, grupo }) {
    return Grupo.findByIdAndUpdate(id, grupo, { new: true });
  }

  static delete({ id }) {
    return Grupo.findByIdAndDelete(id);
  }
}
