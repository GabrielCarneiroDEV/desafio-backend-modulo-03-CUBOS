const { knex } = require("../conexao");
const { validarUsuario } = require("../filtros/validacoes");
const bcrypt = require("bcrypt");

const atualizarUsuario = async (req, res) => {
  const { id } = req.usuario;
  const { nome, email, senha, nome_loja } = req.body;
  const erro = validarUsuario(req.body);

  if (erro) {
    return res.status(400).json(erro);
  }

  try {
    const verificarEmail = await knex("usuarios").where({ email, id }).first();

    if (verificarEmail) {
      return res.status(400).json({
        mensagem:
          "O e-mail informado já está sendo utilizado por outro usuário.",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    await knex("usuarios")
      .update({ nome, email, senha: senhaCriptografada, nome_loja })
      .where({ id: req.usuario.id })
      .returning();

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  atualizarUsuario,
};
