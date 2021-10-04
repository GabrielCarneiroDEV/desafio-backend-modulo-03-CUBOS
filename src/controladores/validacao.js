const validarCadastro = (dadosUsuario) => {
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

const validarLogin = (dadosLogin, usuarioEncontrado) => {
    if(!dadosLogin.email || !dadosLogin.senha){
        return ({mensagem: "Os campos email e senha são obrigatórios."});
    }

    if(usuarioEncontrado === 0){
        return ({mensagem:"Usuário e/ou senha inválido(s)."});
    }
}

module.exports = {
    validarCadastro,
    validarLogin
}