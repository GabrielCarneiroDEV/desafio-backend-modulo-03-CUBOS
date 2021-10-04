
const getUsuario = async (req, res) => {
    const {id, nome, nome_loja, email} = req.usuario;
    return res.json({id, nome, nome_loja, email});
}


module.exports = {
    getUsuario
}