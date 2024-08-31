import { Schema } from "mongoose";

export const representacionSchema = new Schema({
  fecha: {
    type: String,
    required: [true, "Fecha obligatoria"],
    match: [/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha incorrecto"],
  },
  sesion: {
    type: String,
    required: [true, "Sesión obligatoria"],
    enum: ["Mañana", "Tarde"],
  },
  obra: {
    type: Schema.Types.ObjectId,
    ref: "Obra",
    required: [true, "Obra obligatoria"],
  },
  grupo: {
    type: Schema.Types.ObjectId,
    ref: "Grupo",
    required: [true, "Grupo obligatorio"],
  },
});

representacionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
