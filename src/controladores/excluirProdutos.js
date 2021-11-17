const { knex } = require("../conexao");
const supabase = require("../supabase");

const excluirProduto = async (req, res) => {
  const { id } = req.params;
  const { id: usuario_id, nome: nomeUsuario } = req.usuario;

  try {
    const verificarProduto = await knex("produtos")
      .where({ id, usuario_id })
      .first();

    if (!verificarProduto) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }
    if (verificarProduto.imagem !== null) {
      const imagem = `${nomeUsuario}/${verificarProduto.nome}`;

      const { error } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .remove([imagem]);

      if (error) {
        return res.status(400).json(error.message);
      }
    }
    const produtoExcluido = await knex("produtos")
      .where({ id })
      .del()
      .returning();

    if (!produtoExcluido) {
      return res.status(500).json({
        mensagem: "Não foi possível excluir produto, tente novamente.",
      });
    }
    console.log(produtoExcluido);
    return res.status(204).json();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  excluirProduto,
};
