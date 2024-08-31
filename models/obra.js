import { model } from "mongoose";
import { obraSchema } from "../schemas/obras.js";

export const Obra = model("Obra", obraSchema);

export class ObraModel {
  static getAll() {
    return Obra.find({});
  }

  static getById({ id }) {
    return Obra.findById(id);
  }

  static create({ obra }) {
    return new Obra(obra).save();
  }

  static async update({ id, obra }) {
    return Obra.findByIdAndUpdate(id, obra, { new: true });
  }

  static async delete({ id }) {
    return Obra.findByIdAndDelete(id);
  }
}
