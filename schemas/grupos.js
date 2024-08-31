import { Schema } from "mongoose";

export const grupoSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nombre obligatorio"],
    minlength: [5, "Nombre demasiado corto"],
    unique: [true, "Grupo ya existente"],
  },
});

grupoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
