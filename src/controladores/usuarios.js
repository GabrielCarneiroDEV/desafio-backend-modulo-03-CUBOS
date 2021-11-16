const getUsuario = async (req, res) => {
    return res.json(req.usuario);
}

module.exports = {
  getUsuario,
};
