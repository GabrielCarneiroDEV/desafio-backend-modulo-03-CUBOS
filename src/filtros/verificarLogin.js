const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwt_secret");
const { knex } = require("../conexao");

const verificarLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Token não informado." });
  }
  try {
    const token = authorization.replace("Bearer", "").trim();
    const { id } = jwt.verify(token, jwtSecret);
    const verificarUsuario = await knex("usuarios").where({ id }).first();

    if (!verificarUsuario) {
      return res.status(400).json({ mensagem: "Usuario não encontrado" });
    }
    const { senha: _, ...usuario } = verificarUsuario;
    req.usuario = usuario;
  } catch (error) {
    return res
      .status(401)
      .json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      });
  }

  next();
};

module.exports = {
  verificarLogin,
};
