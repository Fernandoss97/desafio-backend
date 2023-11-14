import express from "express";
import loanController from "../controllers/loanController.js";

const router = express.Router();

router.post("/loan_request", loanController.requestLoan);
router.post("/loan_register", loanController.registerLoan);

export default router;
