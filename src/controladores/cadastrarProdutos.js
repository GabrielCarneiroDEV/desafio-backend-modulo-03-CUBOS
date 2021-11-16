const { validarProdutos } = require("../filtros/validacoes");
const { knex } = require("../conexao");

const cadastrarProduto = async (req, res) => {
  const erro = validarProdutos(req.body);

  if (erro) {
    return res.status(400).json(erro);
  }

  const { id } = req.usuario;
  const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;

  try {
    const produtoCadastrado = await knex("produtos").insert({
      usuario_id: id,
      nome,
      quantidade,
      categoria,
      preco,
      descricao,
      imagem,
    });

    if (!produtoCadastrado) {
      return res.status(400).json("O produto não foi cadastrado");
    }

    return res.status(201).json();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  cadastrarProduto,
};
