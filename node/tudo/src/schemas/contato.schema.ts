import { z } from 'zod';

export const contatoSchema = z.object({
  nome: z
    .string()
    .min(1, 'Nome é obrigatório'),

  email: z
    .string()
    .email('Email inválido'),
});
