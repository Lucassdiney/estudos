import express from 'express';
import cors from 'cors';
import contatosRoutes from './routes/ContatosRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/contatos', contatosRoutes);

app.get('/contatos', (req, res) => {
  res.send('API funcionando 🚀');
});

export default app;
