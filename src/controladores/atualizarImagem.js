const { knex } = require("../conexao");
const supabase = require("../supabase");

const uploadImagem = async (req, res, nome) => {
  const { imagem } = req.body;

  const { nome: nomeUsuario } = req.usuario;

  const buffer = Buffer.from(imagem, "base64");

  const endPoint = `${nomeUsuario}/${nome}`;

  try {
    const { data, error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(endPoint, buffer);

    if (error) {
      return res.status(400).json(error.message);
    }

    const { publicURL, error: errorPublicURL } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(endPoint);

    if (errorPublicURL) {
      return res.status(400).json(errorPublicURL.message);
    }

    return res.json(publicURL);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarImagem = async (req, res) => {
  const { id } = req.params;
  const { nome: nomeUsuario } = req.usuario;

  try {
    const produto = await knex("produtos").where({ id }).first();
  
    const imagem = `${nomeUsuario}/${produto.nome}`;

    const { error } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .remove([imagem]);

    if (error) {
      return res.status(400).json(error.message);
    }

    uploadImagem(req, res, produto.nome);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  atualizarImagem,
};
