const { knex } = require("../conexao");
const bcrypt = require("bcrypt");
const schemaCadastroUsuario = require("../validacoes/schemaCadastroUsuarios");

const atualizarUsuario = async (req, res) => {
  const { id } = req.usuario;
  const { nome, email, senha, nome_loja } = req.body;

  try {
    await schemaCadastroUsuario.validate(req.body);

    const verificarEmail = await knex("usuarios").where({ email }).first();
  

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
