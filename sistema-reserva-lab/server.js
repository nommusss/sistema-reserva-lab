const express = require('express');
const app = express();

app.use(express.json());

//rota de utilizadores
app.get('/api/usuarios', (req, res) => {
    res.json({ mensagem: 'Lista de utilizadores do sistema de reservas' });
});

//rota de labs
app.get('/api/laboratorios', (req, res) => {
    res.json({ mensagem: 'Lista de laboratórios disponíveis' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});



