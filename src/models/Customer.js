import mongoose from "mongoose";

const Customer = mongoose.model("Customer", {
  name: String,
  age: Number,
  cpf: String,
  income: Number,
  lacation: String,
});

export default Customer;
