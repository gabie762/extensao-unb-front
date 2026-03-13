import type { Usuario } from './usuario'

export type AreaConhecimento =
  | 'Ciências Exatas e da Terra'
  | 'Ciências Biológicas'
  | 'Engenharias'
  | 'Ciências da Saúde'
  | 'Ciências Agrárias'
  | 'Ciências Sociais Aplicadas'
  | 'Ciências Humanas'
  | 'Linguística, Letras e Artes'

export interface Projeto {
  id: string
  titulo: string
  area: AreaConhecimento
  unidadeResponsavel: string
  descricao: string
  professor: Usuario
  tags: string[]
  status: 'aberto' | 'em_andamento' | 'encerrado'
  vagas: number
  createdAt: string
}