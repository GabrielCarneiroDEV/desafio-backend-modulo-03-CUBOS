
const bcrypt = require('bcrypt');
const { query } = require('../conexao');
const { validarCadastro } = require('./validacao.js');

//CADASTRAR USUARIO
const cadastrarUsuario = async (req, res) => {

    const { nome, email, senha, nome_loja } = req.body;
    const erro = validarCadastro(req.body);

    if(erro){    
        return res.status(400).json(erro);
    }

    try {
        const usuario = await query("select * from usuarios where email = $1", [email]);

        if(usuario.rowCount > 0){
            return res.status(400).json({mensagem: "Já existe usuário cadastrado com o e-mail informado."});
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        await query("insert into usuarios (nome, email, senha, nome_loja) values ($1, $2, $3, $4)", [nome,email, senhaCriptografada, nome_loja]);
        
    } catch (error) {
        res.status(400).json({mensagem: error.message});
    }  
    
    return res.status(201).json();
}

module.exports = {
    cadastrarUsuario
}