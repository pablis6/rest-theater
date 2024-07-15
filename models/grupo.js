import { ObjectId } from "mongodb";
import { client } from "./mongo.js";

// Función para conectar a la base de datos y obtener la colección de grupos
async function connect() {
  try {
    await client.connect();
    const database = client.db("theater_db");
    return database.collection("grupos");
  } catch (error) {
    console.error("Error connecting to the database");
    console.error(error);
    await client.close();
  }
}

export class GrupoModel {
  static async getAll() {
    const db = await connect();
    return db.find({}).toArray();
  }

  static async getById({ id }) {
    const db = await connect();
    return await db.findOne({ _id: new ObjectId(id) });
  }

  static async create({ grupo }) {
    const db = await connect();

    const { insertedId } = await db.insertOne(grupo);
    return {
      ...grupo,
      id: insertedId,
    };
  }

  static async delete({ id }) {
    const db = await connect();
    return await db.deleteOne({ _id: new ObjectId(id) });
  }

  static async update({ id, grupo }) {
    const db = await connect();
    const { modifiedCount } = await db.updateOne(
      { _id: new ObjectId(id) },
      { $set: grupo }
    );
    return modifiedCount > 0 ? grupo : null;
  }
}
