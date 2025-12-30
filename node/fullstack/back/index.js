//Criação de um crud com Express, node e PostgreSQL

const pool = require ('./bd');
const express = require('express');
const cors = require('cors');

//permite que backend acesse o front
//importando express
//importando pool do postgreSQL

const app = express();
//criando o servidor

app.use(cors());
//Middleware - libera acesso a outros dominios

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
//permiti receber dados de formulário html
// consegue ler JSON

//adicionar async
//criar contato
app.post('/contatos', async (req, res) => {
  const { nome, email } = req.body;

  //Validação
  if (!nome || !email) {
    return res.status(400).json({ erro: 'Campos obrigatórios' });
  }

  //Salva no banco
  await pool.query(
    'INSERT INTO contatos (nome, email) VALUES ($1, $2)',
    [nome, email]
  );

  res.status(201).json({ ok: true });
});

//listar TODOS os contatos
app.get('/contatos', async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM contatos ORDER BY id DESC'
    );

    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar contatos' });
  }
});

//buscar contatos por ID 
app.get('/contatos/:id', async (req, res) => {
  const { id } = req.params;
  //pega o id da url

  try {
    const resultado = await pool.query(
      'SELECT * FROM contatos WHERE id = $1',
      [id]
    );
    //busca um contato especifico

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Contato não encontrado' });
    }
    //se não existir cai no 404

    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar contato' });
  }
});

//deletar por ID
app.delete('/contatos/:id', async (req, res) => {
  //a rota delete por id
  const { id } = req.params;

  await pool.query(
    'DELETE FROM contatos WHERE id = $1',
    [id]
  );
  //aqui remove do banco

  res.json({ ok: true, mensagem: 'Contato deletado' });
});



//PUT para os contatos
app.put('/contatos/:id', async (req, res) => {
  //atualiza contato especifico
  const { id } = req.params;
  const { nome, email } = req.body;

  // validação
  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
  }

  //atualiza dados
  try {
    const resultado = await pool.query(
      `UPDATE contatos
       SET nome = $1, email = $2
       WHERE id = $3
       RETURNING *`,
      [nome, email, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Contato não encontrado' });
    }

    //retorna contato atualizado
    res.json({
      mensagem: 'Contato atualizado com sucesso',
      contato: resultado.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao atualizar contato' });
  }
});


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
