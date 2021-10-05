const { query } = require("../conexao");

const excluirProduto = async (req, res) => {
    const { id } = req.params;
    const { usuario_id }= req.body;

    try {

        const verificarProduto = await query('select * from produtos where id = $1 and usuario_id = $2', [id, usuario_id]);
        if(verificarProduto.rowCount === 0){
            return res.status(404).json({mensagem: "Produto inexistente"});
        }

        const usuarioExcluido = await query('delete from produtos where id = $1 and usuario_id = $2', [id, usuario_id]);
        if(usuarioExcluido.rowCount === 0){
            return res.status(400).json({mensagem: "Erro não foi possível excluir o produto"})
        }
        return res.status(200).json();

    } catch (error) {
        
        return res.status(400).json({mensagem: error.message})

    }

}

module.exports = {
    excluirProduto
}