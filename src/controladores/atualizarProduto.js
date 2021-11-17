const { knex } = require("../conexao");
const { validarProdutos } = require("../filtros/validacoes");

const atualizarProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;
  const erro = validarProdutos(req.body);

  if (erro) {
    return res.status(400).json(erro);
  }
  const { nome, quantidade, categoria, preco, descricao } = req.body;

  try {
    const verificarProduto = await knex("produtos")
      .where({ usuario_id: usuario.id, id })
      .first();

    if (!verificarProduto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    if (verificarProduto.usuario_id !== usuario.id) {
      return res.status(403).json({
        mensagem: "Você não tem autorização para modificar o produto.",
      });
    }

    const { categoria: categoriaProduto, imagem: imagemProduto } =
      verificarProduto;
    const produtoAtualizado = await knex("produtos")
      .update({
        nome,
        quantidade,
        categoria: categoria ?? categoriaProduto,
        preco,
        descricao,
        imagem: imagemProduto,
      })
      .where({ usuario_id: usuario.id, id });

    return res.status(204).json();
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  atualizarProduto,
};
