import 'dotenv/config';
import app from './app';
import './bd/pool';

app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000');
});
