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


//CADASTRAR USUARIO
rotas.post('/usuario', usuarios.cadastrarUsuario);
//LOGIN 
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



// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado