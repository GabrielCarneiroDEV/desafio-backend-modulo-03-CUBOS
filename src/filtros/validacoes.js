const validarUsuario = (dadosUsuario) => {
    if(!dadosUsuario.nome){
    return ({mensagem:"O campo nome é obrigatório."});
    }
    if(!dadosUsuario.email){
        return  ({mensagem:"O campo email é obrigatório."});
    }
    if(!dadosUsuario.senha){
        return  ({mensagem:"O campo senha é obrigatório."});
    }
    if(!dadosUsuario.nome_loja){
        return ({mensagem:"O campo nome_loja é obrigatório."});
    }

}



const validarProdutos = (produto) => {
    if(!produto.nome){
        return ({mensagem: "O nome do produto deve ser informado."});
    }
    if(!produto.quantidade){
        return ({mensagem: "A quantidade do produto deve ser informada."});
    }
    if(!produto.preco){
        return ({mensagem: "O preço do produto deve ser informado."});
    }
    if(!produto.descricao){
        return ({mensagem: "A descrição do produto deve ser informada."});
    }
    if(produto.quantidade <= 0){
        return ({mensagem: "A quantidade do produto deve ser maior que zero."});
    }
}

module.exports = {
    validarUsuario,
    validarProdutos
}