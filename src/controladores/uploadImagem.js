const supabase = require("../supabase");

const uploadImagem = async (req, res, next) => {
  const { nome, imagem } = req.body;

  if(!imagem)next();

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

    req.body.imagem = publicURL
    next();

    return res.json(publicURL);

    
  } catch (error) {
    return res.status(400).json(error.message);
  }

};



module.exports = {
  uploadImagem,
  
};
