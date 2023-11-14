import express from "express";
import db from "./config/dbConnect.js";
import loanRoutes from "./routes/loanRoutes.js";

db.on("error", console.log.bind(console, "DB Connection error"));
db.once("open", () => {
  console.log("DB connection successful");
});

const app = express();

app.use(express.json());
app.use(loanRoutes);

export default app;
