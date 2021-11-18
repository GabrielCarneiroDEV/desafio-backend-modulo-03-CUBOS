const yup = require('./configuracoes');

const schemaCadastroProdutos = yup.object().shape({
    nome: yup.string().required(),
    quantidade: yup.number().integer().required().min(1),
    descricao: yup.string().required(),
    preco: yup.number().integer()
    .required("o preço do produto deve ser informado").min(1)

})

module.exports = schemaCadastroProdutos;