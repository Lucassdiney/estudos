import { Request, Response } from 'express';
import pool from '../bd/pool';

export async function criarContato(req: Request, res: Response) {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
  }

  const result = await pool.query(
    'INSERT INTO contatos (nome, email) VALUES ($1, $2) RETURNING *',
    [nome, email]
  );

  return res.status(201).json(result.rows[0]);
}

export async function listarContatos(req: Request, res: Response) {
  const result = await pool.query(
    'SELECT * FROM contatos ORDER BY id DESC'
  );

  return res.json(result.rows);
}

export async function buscarContatoPorId(req: Request, res: Response) {
  const { id } = req.params;

  const result = await pool.query(
    'SELECT * FROM contatos WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ erro: 'Contato não encontrado' });
  }

  return res.json(result.rows[0]);
}

export async function atualizarContato(req: Request, res: Response) {
  const { id } = req.params;
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
  }

  const result = await pool.query(
    `UPDATE contatos 
     SET nome = $1, email = $2 
     WHERE id = $3 
     RETURNING *`,
    [nome, email, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ erro: 'Contato não encontrado' });
  }

  return res.json(result.rows[0]);
}

export async function deletarContato(req: Request, res: Response) {
  const { id } = req.params;

  await pool.query(
    'DELETE FROM contatos WHERE id = $1',
    [id]
  );

  return res.json({ mensagem: 'Contato deletado com sucesso' });
}
