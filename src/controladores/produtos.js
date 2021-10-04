const { query } = require('../conexao');


const listarProdutos = async (req, res) => {
    const  { id } = req.usuario
    console.log(req.usuario)
    const produtos = await query('select * from produtos where usuario_id = $1 ', [id])
    return res.json(produtos.rows)

}

const obterProduto = async (req, res) => {

}

module.exports = {
    listarProdutos,
    obterProduto
}