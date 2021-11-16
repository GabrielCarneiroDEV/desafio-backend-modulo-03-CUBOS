const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwt_secret");
const { knex } = require("../conexao");

const login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Os campos email e senha são obrigatórios." });
  }

  try {
    const encontrarUsuario = await knex("usuarios").where({ email }).first();

    if (!encontrarUsuario) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const senhaVerificada = await bcrypt.compare(senha, encontrarUsuario.senha);

    if (!senhaVerificada) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const token = jwt.sign(
      {
        id: encontrarUsuario.id,
      },
      jwtSecret,
      { expiresIn: "24h" }
    );

    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};
module.exports = {
  login,
};
