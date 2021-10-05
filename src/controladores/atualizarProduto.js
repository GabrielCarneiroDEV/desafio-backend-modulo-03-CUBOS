const { query } = require("../conexao");
const { validarProdutos } = require("./validacao");

const atualizarProduto = async (req, res) => {

    const { id } = req.params;
    const { id: usuario_id } = req.usuario

    const erro = validarProdutos(req.body);

    if(erro){

        return res.status(400).json(erro);
    }

    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;

    try {

        const {rows} = await query(' select * from produtos where id = $1 and usuario_id = $2', [id, usuario_id]);


        const { categoria: categoriaProduto, imagem: imagemProduto } = rows[0]
        const produtoAtualizado = await query('update produtos set nome = $1, quantidade = $2, categoria = $3, preco = $4, descricao = $5, imagem =$6 where id = $7 and usuario_id = $8', [nome, quantidade, categoria ??categoriaProduto, preco, descricao, imagem ?? imagemProduto, id, usuario_id]);

       
        return res.status(200).json();
        
    } catch (error) {

        res.status(400).json({mensagem: error.message})
        
    }
    

}

module.exports ={
    atualizarProduto
}