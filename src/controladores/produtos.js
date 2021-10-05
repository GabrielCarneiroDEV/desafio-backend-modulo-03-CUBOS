const { query } = require('../conexao');


const listarProdutos = async (req, res) => {
    const  { id } = req.usuario;

    try {

        const produtos = await query('select * from produtos where usuario_id = $1 ', [id]);

        return res.json(produtos.rows);
        
    } catch (error) {

        return res.status(400).json({mensagem:error.message});
    }


}

const obterProduto = async (req, res) => {

    const { id } = req.params;
    const { id: usuario_id } = req.usuario
   
    try {

        const produtoAtualizado = await query('select * from produtos where id = $1 and usuario_id = $2', [id, usuario_id]);
        

        return res.status(200).json(produtoAtualizado.rows[0]);

    } catch (error) {

        return res.status(400).json({mensagem: error.message})
        
    }


}

module.exports = {
    listarProdutos,
    obterProduto
}