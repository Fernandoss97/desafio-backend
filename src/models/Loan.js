import mongoose from "mongoose";

const Loan = mongoose.model("Loan", {
  type: String,
  interest_rate: Number,
});

export default Loan;
