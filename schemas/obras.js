import { Schema } from "mongoose";

export const obraSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nombre obligatorio"],
    minlength: [5, "Nombre demasiado corto"],
    unique: [true, "Obra ya existente"],
  },
});

obraSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
