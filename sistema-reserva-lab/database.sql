CREATE DATABASE SistemaReservaLab;
GO

USE SistemaReservaLab;
GO

-- tabela de status
CREATE TABLE Status (
    id INT IDENTITY(1,1) PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

-- tabela de utilizadores
CREATE TABLE Usuarios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) NOT NULL
);

-- tabela de labs
CREATE TABLE Laboratorios (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    capacidade INT NOT NULL
);

-- tabela de salas de aula
CREATE TABLE Salas (
    id INT IDENTITY(1,1) PRIMARY KEY,
    numero VARCHAR(20) NOT NULL,
    bloco VARCHAR(10) NOT NULL
);


