import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;

mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPass}@cluster0.v5ufrno.mongodb.net/?retryWrites=true&w=majority`
);

let db = mongoose.connection;

export default db;
