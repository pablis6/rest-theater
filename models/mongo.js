import "dotenv/config";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB using mongoose");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB");
    console.error(error);
  });

process.on("uncaughtException", (error) => {
  console.error(error);
  mongoose.disconnect();
});
