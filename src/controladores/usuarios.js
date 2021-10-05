const { query } = require("../conexao");

const getUsuario = async (req, res) => {

    const { id } = req.usuario;

    try {

        const usuario = await query('select id, nome, email, nome_loja from usuario where id = $1', [id]);
        console.log(usuario.rows)

        return res.json(usuario.rows[0]);
        
    } catch (error) {

        return res.status(400).json({mensagem: error.message});
        
    }
   
    
}


module.exports = {
    getUsuario
}