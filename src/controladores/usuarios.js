
const getUsuario = async (req, res) => {
    res.json(req.usuario)
}


module.exports = {
    getUsuario
}