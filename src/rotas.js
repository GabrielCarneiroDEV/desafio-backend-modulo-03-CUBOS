const express = require('express');
const usuarios = require('./controladores/cadastrarUsuarios')
const login = require('./controladores/login');
const { getUsuario } = require('./controladores/usuarios');

const { verificarLogin } = require('./filtros/verificarLogin');
const rotas = express();


//CADASTRAR USUARIO
rotas.post('/usuario', usuarios.cadastrarUsuario);
//LOGIN 
rotas.post('/login', login.login);
rotas.use(verificarLogin).get('/usuario', getUsuario);
module.exports = rotas;