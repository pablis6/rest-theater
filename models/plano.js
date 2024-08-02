import { model } from "mongoose";
import { planoSchema } from "../schemas/planos.js";

export const Plano = model("Plano", planoSchema);

export class PlanoModel {
  static getAll() {
    return Plano.find({});
  }

  static getByRepresentacionId({ id }) {
    return Plano.findOne({ representacion: id });
  }

  static create({ plano }) {
    return new Plano(plano).save();
  }

  static update({ id, plano }) {
    return Plano.findByIdAndUpdate(id, plano, { new: true });
  }

  //TODO: Implementar el método updateSeat
  static updateSeat({ id, butacas }) {
    return Plano.findOneAndUpdate(
      { representacion: id },
      {
        $set: {
          butacas,
        },
      },
      { new: true }
    );
    // Plano.findOneAndUpdate(
    //   { representacion: id },
    //   {
    //     $set: {
    //       butacas: butacas,
    //     },
    //   },
    //   { new: true }
    // );

    // const db = connect();
    // const updateDocument = {
    //   $set: {
    //     "butacas.$[elem].estado": plano.butacas[0]?.estado,
    //     "butacas.$[elem].asignadoA": plano.butacas[0]?.asignadoA,
    //   },
    // };
    // const arrayFilters = [
    //   {
    //     $or: plano.butacas.map((butaca) => {
    //       return {
    //         $and: [
    //           {
    //             "elem.fila": { $eq: butaca.fila },
    //             "elem.num_butaca": { $eq: butaca.num_butaca },
    //           },
    //         ],
    //       };
    //     }),
    //   },
    // ];
    // const ret = await db.updateOne({ _id: new ObjectId(id) }, updateDocument, {
    //   arrayFilters,
    // });
    // return ret;
  }

  static delete({ id }) {
    return Plano.findByIdAndDelete(id);
  }

  static deleteFromRepresentacion({ representacionId }) {
    return Plano.findOneAndDelete({ representacion: representacionId });
  }
}
