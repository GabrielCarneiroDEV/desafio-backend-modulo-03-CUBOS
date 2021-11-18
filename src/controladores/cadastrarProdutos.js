const { knex } = require("../conexao");
const schemaCadastroProdutos = require("../validacoes/schemaCadastroProdutos");
const { uploadImagem } = require("./uploadImagem");

const cadastrarProduto = async (req, res) => {
  const { id } = req.usuario;

  try {
    await schemaCadastroProdutos.validate(req.body);

    if (req.body.imagem) {
      await uploadImagem(req, res);
    }

    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;
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
