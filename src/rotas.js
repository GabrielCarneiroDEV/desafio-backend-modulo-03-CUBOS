const express = require('express');
const usuarios = require('./controladores/cadastrarUsuarios');
const login = require('./controladores/login');
const atualizarUsuario = require('./controladores/atualizarUsuario');
const produtos = require('./controladores/produtos');
const cadastrarProdutos = require('./controladores/cadastrarProdutos');
const atualizarProdutos = require('./controladores/atualizarProduto');
const excluirProdutos = require('./controladores/excluirProdutos');
const { getUsuario } = require('./controladores/usuarios');
const { verificarLogin } = require('./filtros/verificarLogin');
const rotas = express();



rotas.post('/usuarios', usuarios.cadastrarUsuario);
rotas.post('/login', login.login);

rotas.use(verificarLogin);

rotas.get('/usuario', getUsuario);
rotas.put('/usuario', atualizarUsuario.atualizarUsuario);

rotas.get('/produtos', produtos.listarProdutos);
rotas.post('/produtos', cadastrarProdutos.cadastrarProduto);
rotas.get('/produtos/:id', produtos.obterProduto);
rotas.put('/produtos/:id', atualizarProdutos.atualizarProduto);
rotas.delete('/produtos/:id', excluirProdutos.excluirProduto);

module.exports = rotas;
