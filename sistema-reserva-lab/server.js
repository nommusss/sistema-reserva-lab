const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

//abre ou cria um ficheiro de base de dados local sozinho
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Ligado com sucesso à base de dados SQLite!');
    }
});

//criar as tabelas sozinho se não existirem
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        tipo TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Laboratorios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        capacidade INTEGER NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Salas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        numero TEXT NOT NULL,
        bloco TEXT NOT NULL
    )`);
});

//rota dos utilizadors
app.get('/api/usuarios', (req, res) => {
    db.all('SELECT * FROM Usuarios', [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

app.post('/api/usuarios', (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    db.run(`INSERT INTO Usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)`, [nome, email, senha, tipo], function(err) {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ id: this.lastID, mensagem: 'Utilizador registado com sucesso!' });
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
    const { nome, capacidade } = req.body;
    db.run(`INSERT INTO Laboratorios (nome, capacidade) VALUES (?, ?)`, [nome, capacidade], function(err) {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ id: this.lastID, mensagem: 'Laboratório registado com sucesso!' });
    });
});

//rota das salas
app.get('/api/salas', (req, res) => {
    db.all('SELECT * FROM Salas', [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

app.post('/api/salas', (req, res) => {
    const { numero, bloco } = req.body;
    db.run(`INSERT INTO Salas (numero, bloco) VALUES (?, ?)`, [numero, bloco], function(err) {
        if (err) return res.status(500).json({ erro: err.message });
        res.status(201).json({ id: this.lastID, mensagem: 'Sala registada com sucesso!' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});




