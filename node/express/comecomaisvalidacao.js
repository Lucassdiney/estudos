const express = require('express');

// Cria o servidor
const app = express();

// Lê JSON automaticamente
app.use(express.json());

// Rota GET
app.get('/', (req, res) => {
  res.send('Servidor on!');
});

// POST com validação
app.post('/contato', (req, res) => {
  const { nome, idade } = req.body;

  //validação
  if (!nome) {
    return res.status(400).json({
      erro: 'Nome é obrigatório'
    });
  }

  if (typeof nome !== 'string') {
    return res.status(400).json({
      erro: 'Nome precisa ser texto'
    });
  }

  if (idade && typeof idade !== 'number') {
    return res.status(400).json({
      erro: 'Idade precisa ser número'
    });
  }

  //passou na validação
  res.json({
    mensagem: 'Dados válidos!',
    dados: { nome, idade }
  });
});

app.listen(3000, () => {
  console.log('Abre o navegador!');
});
