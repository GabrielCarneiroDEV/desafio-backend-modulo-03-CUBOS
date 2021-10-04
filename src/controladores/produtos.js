const { query } = require('../conexao');

const listarProdutos = async (req, res) => {

    const produtos = await query('select * from produtos ')
    return res.json(produtos.rows)

}

const obterProduto = async (req, res) => {

}

module.exports = {
    listarProdutos,
    obterProduto
}