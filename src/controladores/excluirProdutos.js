const { knex } = require("../conexao");

const excluirProduto = async (req, res) => {
  const { id } = req.params;
  const { id: usuario_id } = req.usuario;

  try {
    const verificarProduto = await knex("produtos")
      .where({ id, usuario_id })
      .first();

    if (!verificarProduto) {
      return res.status(404).json({ mensagem: "Produto não encontrado."});
    }

    const produtoExcluido = await knex("produtos")
      .del()
      .where({ id })
      .returning();

    if (!produtoExcluido) {
      return res
        .status(500)
        .json({
          mensagem: "Não foi possível excluir produto, tente novamente."});
    }

    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  excluirProduto,
};
