const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

//base de dados local SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Conectado com sucesso ao banco de dados SQLite!');
    }
});

//criar as tabelas do documento do projeto
db.serialize(() => {
    //1. cadastro dos usuarios
    db.run(`CREATE TABLE IF NOT EXISTS Usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cpf TEXT UNIQUE NOT NULL,
        nome_completo TEXT NOT NULL,
        data_aniversario TEXT NOT NULL,
        celular TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        login TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        data_cadastro TEXT DEFAULT CURRENT_TIMESTAMP,
        data_acesso TEXT
    )`);

    //2. cadastro dos labs
    db.run(`CREATE TABLE IF NOT EXISTS Laboratorios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT UNIQUE NOT NULL,
        nome TEXT NOT NULL,
        capacidade INTEGER NOT NULL,
        localizacao TEXT NOT NULL
    )`);

    //3. cadastro das salas
    db.run(`CREATE TABLE IF NOT EXISTS Salas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT UNIQUE NOT NULL,
        nome TEXT NOT NULL,
        capacidade INTEGER NOT NULL,
        localizacao TEXT NOT NULL
    )`);

    //4. cadastro de sgit push origin mastertatus
    db.run(`CREATE TABLE IF NOT EXISTS Status (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo TEXT UNIQUE NOT NULL,
        nome TEXT NOT NULL,
        descricao TEXT
    )`);
});

//rota dos usuarios
app.get('/api/usuarios', (req, res) => {
    db.all('SELECT * FROM Usuarios', [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

app.post('/api/usuarios', (req, res) => {
    const { cpf, nome_completo, data_aniversario, celular, email, login, senha } = req.body;
    const query = `INSERT INTO Usuarios (cpf, nome_completo, data_aniversario, celular, email, login, senha) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run(query, [cpf, nome_completo, data_aniversario, celular, email, login, senha], function(err) {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ id: this.lastID, mensagem: 'Usuário cadastrado com sucesso!' });
    });
});

//rotas dos labs
app.get('/api/laboratorios', (req, res) => {
    db.all('SELECT * FROM Laboratorios', [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

app.post('/api/laboratorios', (req, res) => {
    const { codigo, nome, capacidade, localizacao } = req.body;
    const query = `INSERT INTO Laboratorios (codigo, nome, capacidade, localizacao) VALUES (?, ?, ?, ?)`;
    db.run(query, [codigo, nome, capacidade, localizacao], function(err) {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ id: this.lastID, mensagem: 'Laboratório cadastrado com sucesso!' });
    });
});

//rotas das salas
app.get('/api/salas', (req, res) => {
    db.all('SELECT * FROM Salas', [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

app.post('/api/salas', (req, res) => {
    const { codigo, nome, capacidade, localizacao } = req.body;
    const query = `INSERT INTO Salas (codigo, nome, capacidade, localizacao) VALUES (?, ?, ?, ?)`;
    db.run(query, [codigo, nome, capacidade, localizacao], function(err) {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ id: this.lastID, mensagem: 'Sala cadastrada com sucesso!' });
    });
});

//rotas de status
app.get('/api/status', (req, res) => {
    db.all('SELECT * FROM Status', [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

app.post('/api/status', (req, res) => {
    const { codigo, nome, descricao } = req.body;
    const query = `INSERT INTO Status (codigo, nome, descricao) VALUES (?, ?, ?)`;
    db.run(query, [codigo, nome, descricao], function(err) {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ id: this.lastID, mensagem: 'Status cadastrado com sucesso!' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});






