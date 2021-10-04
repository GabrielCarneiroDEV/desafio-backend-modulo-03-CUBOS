const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');
const { query } = require('../conexao')

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
    return res.status(404).json("Token não informado.");
    }

    try {
        const token = authorization.replace('Bearer', '').trim();
     
        const usuario = jwt.verify(token, jwtSecret);
        const { rowCount } = await query('select * from usuario where id = $1', [usuario.id])
        console.log(rowCount)
        console.log(usuario.id)

        req.usuario = usuario;
      
    
    } catch (error) {
        console.log('entrei no catch')
        return res.status(400).json(error.message);
    }
   
    next();
}

module.exports = {
    verificarLogin  
}