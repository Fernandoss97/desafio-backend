import Customer from "../models/Customer.js";
import Loan from "../models/Loan.js";

class loanController {
  static requestLoan = async (req, res) => {
    const { name, age, income, cpf, location } = req.body;

    if (!name) {
      return res.status(422).json({ msg: "Nome é obrigatório!" });
    }

    if (!age) {
      return res.status(422).json({ msg: "Idade é obrigatório!" });
    }

    if (!income) {
      return res.status(422).json({ msg: "Renda é obrigatório!" });
    }

    if (!cpf) {
      return res.status(422).json({ msg: "CPF é obrigatório!" });
    }

    if (!location) {
      return res.status(422).json({ msg: "Localização é obrigatória!" });
    }

    let loans_granted = [];

    if (
      income <= 3000 ||
      (income >= 3000 && income <= 5000 && age < 30 && location == "SP")
    ) {
      loans_granted.push(await Loan.findOne({ type: "PERSONAL" }, { _id: 0 }));
    }

    if (income >= 5000) {
      loans_granted.push(
        await Loan.findOne({ type: "CONSIGNMENT" }, { _id: 0 })
      );
    }

    if (
      income <= 3000 ||
      (income >= 300 && income <= 5000 && age < 30 && location == "SP")
    ) {
      loans_granted.push(
        await Loan.findOne({ type: "GUARANTEED" }, { _id: 0 })
      );
    }

    if (loans_granted.length === 0) {
      return res
        .status(404)
        .json({ msg: "Não há empréstimos disponíveis para o seu perfil!" });
    } else {
      return res.status(200).json({ name, loans_granted });
    }
  };

  static registerLoan = async (req, res) => {
    const { type, interest_rate } = req.body;

    if (!type) {
      return res.status(422).json({ msg: "Informe o tipo do empréstimo!" });
    }

    if (!interest_rate) {
      return res
        .status(422)
        .json({ msg: "Informe a taxa de juros do empréstimo!" });
    }

    const loan = new Loan({
      type,
      interest_rate,
    });

    await loan
      .save()
      .then((loan) => {
        res.status(201).json({ msg: "Empréstimo cadastrado com sucesso!" });
      })
      .catch((error) => {
        res.status(500).json({
          msg: `${error} Falha ao cadastrar empréstimo, tente novamente!`,
        });
      });
  };
}

export default loanController;
