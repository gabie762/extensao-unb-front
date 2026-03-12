import type { Projeto } from './projeto'

export interface Oportunidade {
  projetoId: string
  projeto: Projeto
  titulo: string
  descricao: string
  requisitos: string[]
  prazoInscricao: string
  tipo: 'bolsa' | 'voluntario'
}