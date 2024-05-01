import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGO_URL as string);
let connection = mongoose.connection;

connection.on("connected", () =>
  console.log("database is connected successfully")
);
connection.on("error", console.error.bind(console, "connection error:"));
