const bcrypt = require("bcrypt");
const transporter = require("../nodemailer")
const { knex } = require("../conexao");
const { validarUsuario } = require("../filtros/validacoes.js");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;
  const erro = validarUsuario(req.body);

  if (erro) {
    return res.status(400).json(erro);
  }

  try {
    const verificarEmail = await knex("usuarios")
      .where({ email })
      .first()
      .returning();

    if (verificarEmail) {
      return res
        .status(400)
        .json({mensagem: "Já existe usuário cadastrado com o e-mail informado."});
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await knex("usuarios")
      .insert({ nome, email, senha: senhaCriptografada, nome_loja })
      .returning()
      .debug();

    transporter.sendMail({
      from:"Gabriel <paratestarsmtp@gmail.com>",
      to:email,
      subject:"usuario cadastrado",
      text:`Olá ${nome}, obrigado por efetuar o cadastro.`
    }); 

    return res.status(201).json();
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  } 
};

module.exports = {
  cadastrarUsuario,
};