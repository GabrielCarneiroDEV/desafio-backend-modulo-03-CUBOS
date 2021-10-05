CREATE DATABASE market_cubos;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  nome_loja TEXT NOT NULL,
  email TEXT NOT NULL,
  senha TEXT NOT NULL
);

CREATE TABLE produtos (
  id SERIAL PRIMARY KEY NOT NULL,
  usuario_id INT REFERENCES usuario(id) NOT NULL,
  nome TEXT NOT NULL,
  quantidade INT NOT NULL,
  categoria TEXT,
  preco INT NOT NULL,
  descricao TEXT NOT NULL,
  imagem TEXT
);

