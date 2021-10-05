const { validarProdutos } = require("./validacao");
const { query } = require('../conexao');

const cadastrarProduto = async (req, res) => {

   const erro = validarProdutos(req.body)

   if(erro){
       return res.status(400).json(erro)
   }

    const { id } = req.usuario;
    const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;

   
    try {


        const produtoCadastrado = await query("insert into produtos (usuario_id, nome, quantidade, categoria, preco, descricao, imagem) values ($1, $2, $3, $4, $5, $6, $7)", [id, nome, quantidade, categoria, preco, descricao, imagem]);
        
    } catch (error) {

        return res.status(400).json({mensagem: error.message});
        
    }


    return res.json();
}

module.exports ={
    cadastrarProduto
}