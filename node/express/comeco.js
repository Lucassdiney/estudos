const express = require('express');

// Ele cria o servidor
const app = express();

//Substitui req.on(data e end) e json.parse
app.use(express.json());

//Cria uma rota get
app.get('/', (req, res) => {
    res.send('Servidor on!')
});

//Acrescentando o post no codigo!
app.post('/contato', (req, res) => {
    const dados = req.body;

    res.json({
        mensagem: 'Post funcionando!', dados
    });
});

app.listen(3000, () => {
    console.log('Abre o navegador!')
})