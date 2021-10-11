const { query } = require('../conexao');
const { validarCadastro } = require("./validacao");
const bcrypt = require('bcrypt');

const atualizarUsuario = async (req, res) => {
    const { id } = req.usuario;
    const { nome, email, senha, nome_loja } = req.body;
    const erro = validarCadastro(req.body);

    if(erro){
        return res.status(400).json(erro)
    }

    try {
        const {rowCount : verificarEmail } = await query('select * from usuarios where email = $1 and id <> $2', [email, id]);

        if(verificarEmail > 0){
            return res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário."});
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        await query('update usuarios set nome = $1, email = $2, senha = $3, nome_loja = $4 where id = $5', [nome, email, senhaCriptografada, nome_loja, id]);

        return res.status(204).json();

    } catch (error) {
        return res.status(400).json({mensagem:error.message});
    }

  
  
}

module.exports = {
    atualizarUsuario
}