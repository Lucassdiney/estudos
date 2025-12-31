import { Router } from 'express';
import {
  criarContato,
  listarContatos,
  buscarContatoPorId,
  atualizarContato,
  deletarContato,
} from '../controllers/ContatosController';

const router = Router();

router.post('/', criarContato);
router.get('/', listarContatos);
router.get('/:id', buscarContatoPorId);
router.put('/:id', atualizarContato);
router.delete('/:id', deletarContato);

export default router;
