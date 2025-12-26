const express = require('express');
const fs = require('fs/promises');

const app = express();

app.use(express.json());

// rota GET só pra teste
app.get('/', (req, res) => {
  res.send('Servidor on!');
});

// POST
app.post('/contato', async (req, res) => {
  try {
    const { nome, idade } = req.body;

    // Validação de nome e idade
    if (!nome || typeof nome !== 'string') {
      return res.status(400).json({ erro: 'Nome inválido' });
    }

    if (idade && typeof idade !== 'number') {
      return res.status(400).json({ erro: 'Idade inválida' });
    }

    // leitura de arquivo
    let contatos = [];

    try {
      const arquivo = await fs.readFile('contatos.json', 'utf8');
      contatos = JSON.parse(arquivo);
    } catch {
      contatos = []; // arquivo ainda não existe
    }

    //adicionar novo contato
    const novoContato = {
      id: contatos.length + 1,
      nome,
      idade
    };

    contatos.push(novoContato);

    //salvar no arquivo
    await fs.writeFile(
      'contatos.json',
      JSON.stringify(contatos, null, 2)
    );

    res.status(201).json({
      mensagem: 'Contato salvo com sucesso',
      contato: novoContato
    });

  } catch (err) {
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
