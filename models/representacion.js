import { ObjectId } from "mongodb";
import { client } from "./mongo.js";

async function connect() {
  try {
    await client.connect();
    const database = client.db("theater_db");
    return database.collection("representaciones");
  } catch (error) {
    console.error("Error connecting to the database");
    console.error(error);
    await client.close();
  }
}

export class RepresentacionModel {
  static async getAll() {
    const db = await connect();
    return db.find({}).toArray();
  }

  static async getById({ id }) {
    const db = await connect();
    return await db.findOne({ _id: new ObjectId(id) });
  }

  static async create({ representacion }) {
    const db = await connect();

    const { insertedId } = await db.insertOne(representacion);
    return {
      ...representacion,
      id: insertedId,
    };
  }

  static async delete({ id }) {
    const db = await connect();
    return await db.deleteOne({ _id: new ObjectId(id) });
  }

  static async update({ id, representacion }) {
    const db = await connect();
    const { modifiedCount } = await db.updateOne(
      { _id: new ObjectId(id) },
      { $set: representacion }
    );
    return modifiedCount > 0 ? representacion : null;
  }
}
