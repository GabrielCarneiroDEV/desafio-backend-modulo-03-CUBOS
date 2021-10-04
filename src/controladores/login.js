const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret')
const { query } = require('../conexao');
const { validarLogin } = require('./validacao.js');



const login = async (req, res) =>{
    
    const {email, senha} = req.body;

    try {

        const {rows, rowCount} = await    query('select * from usuario where email = $1', [email]);

        const erro = validarLogin(req.body, rowCount);

        if(erro){
            res.status(400);
    
            res.json(erro);
    
            return;
        }


        const usuario = rows[0];

        const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

        if(!senhaVerificada){

            return res.status(400).json({mensagem:"Usuário e/ou senha inválido(s)."});
        }

        const token = jwt.sign({
            id:usuario.id,
            nome:usuario.nome,
            nome_loja:usuario.nome_loja,
            email:usuario.email
            },jwtSecret, {expiresIn: '1h'
        });
        
      
    
        return res.status(200).json(token);

    } catch (error) {

        res.status(400).json({mensagem: error.message});
        
    }

}




module.exports = {
    login
}