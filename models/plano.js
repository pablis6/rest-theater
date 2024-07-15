import { ObjectId } from "mongodb";
import { client } from "./mongo.js";

async function connect() {
  try {
    await client.connect();
    const database = client.db("theater_db");
    return database.collection("planos");
  } catch (error) {
    console.error("Error connecting to the database");
    console.error(error);
    await client.close();
  }
}

export class PlanoModel {
  static async getAll() {
    const db = await connect();
    return db.find({}).toArray();
  }

  static async getById({ id }) {
    const db = await connect();
    return await db.findOne({ _id: new ObjectId(id) });
  }

  static async create({ plano }) {
    const db = await connect();

    const { insertedId } = await db.insertOne(plano);
    return {
      ...plano,
      id: insertedId,
    };
  }

  static async delete({ id }) {
    const db = await connect();
    return await db.deleteOne({ _id: new ObjectId(id) });
  }

  static async update({ id, plano }) {
    const db = await connect();
    const { modifiedCount } = await db.updateOne(
      { _id: new ObjectId(id) },
      { $set: plano }
    );
    return modifiedCount > 0 ? plano : null;
  }

  static async updateSeat({ id, plano }) {
    const db = await connect();

    const updateDocument = {
      $set: {
        "butacas.$[elem].estado": plano.butacas[0]?.estado,
        "butacas.$[elem].asignadoA": plano.butacas[0]?.asignadoA,
      },
    };
    const arrayFilters = [
      {
        $or: plano.butacas.map((butaca) => {
          return {
            $and: [
              {
                "elem.fila": { $eq: butaca.fila },
                "elem.num_butaca": { $eq: butaca.num_butaca },
              },
            ],
          };
        }),
      },
    ];

    const ret = await db.updateOne({ _id: new ObjectId(id) }, updateDocument, {
      arrayFilters,
    });

    return ret;
  }
}
