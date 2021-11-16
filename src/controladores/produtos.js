const { knex } = require("../conexao");

const listarProdutos = async (req, res) => {
  const { id } = req.usuario;

  if (req.query.categoria) {
    const { categoria } = req.query;

    try {
      const produtos = await knex("produtos")
        .where({ usuario_id: id })
        .where("categoria", "ilike", categoria)
        .first();
      console.log(produtos);

      return res.json(produtos);
    } catch (error) {
      return res.status(400).json({ mensagem: error.message });
    }
  }

  try {
    const produtos = await knex("produtos").where({ usuario_id: id });

    return res.json(produtos);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const obterProduto = async (req, res) => {
  const { id } = req.params;
  const { id: usuario_id } = req.usuario;

  try {
    const produtoEncontrado = await knex("produtos")
      .where({ usuario_id, id })
      .first();

    if (!produtoEncontrado) {
      return res.status(404).json({ mensagem: "produto não encontrado" });
    }
    return res.status(200).json(produtoEncontrado);

  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  listarProdutos,
  obterProduto,
};
