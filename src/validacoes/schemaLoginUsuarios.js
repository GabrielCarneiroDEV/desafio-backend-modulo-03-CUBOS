const yup = require('./configuracoes');

const schemaLoginUsuarios = yup.object().shape({
    email: yup.string().required(),
    senha: yup.string().required()
})

module.exports = schemaLoginUsuarios;