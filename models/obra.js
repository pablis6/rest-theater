import { ObjectId } from "mongodb";
import { client } from "./mongo.js";

async function connect() {
  try {
    await client.connect();
    const database = client.db("theater_db");
    return database.collection("obras");
  } catch (error) {
    console.error("Error connecting to the database");
    console.error(error);
    await client.close();
  }
}

export class ObraModel {
  static async getAll() {
    const db = await connect();
    return db?.find({}).toArray();
  }

  static async getById({ id }) {
    const db = await connect();
    return await db.findOne({ _id: new ObjectId(id) });
  }

  static async create({ obra }) {
    const db = await connect();

    const { insertedId } = await db.insertOne(obra);
    return {
      ...obra,
      id: insertedId,
    };
  }

  static async delete({ id }) {
    const db = await connect();
    return await db.deleteOne({ _id: new ObjectId(id) });
  }

  //TODO: Update an existing obra
  static async update({ id, obra }) {
    const db = await connect();
    const { matchedCount } = await db.updateOne(
      { _id: new ObjectId(id) },
      { $set: obra }
    );
    return matchedCount > 0 ? obra : null;
  }
}
