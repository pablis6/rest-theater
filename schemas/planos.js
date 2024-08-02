import { Schema } from "mongoose";

export const planoSchema = new Schema({
  representacion: { type: Schema.Types.ObjectId, ref: "Representacion" },
  butacas: [
    [
      {
        fila: { type: Number, required: true },
        num_butaca: { type: Number, required: true },
        estado: {
          type: String,
          enum: [
            "Pasillo",
            "Vacia",
            "Libre",
            "Ocupada",
            "Reservada",
            "Seleccionada",
            "Rota",
          ],
          required: true,
        },
        asignadoA: { type: String },
      },
    ],
  ],
});

planoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
