import type { ProximoEvento } from './evento'
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
  unidadeResponsavel: string,
  resumo: string,
  coordenador: string,
  cronograma: string,
  tags: string[]
  status: 'aberto' | 'em_andamento' | 'encerrado'
  quantidadeParticipantes: number,
  proximoEvento: ProximoEvento
}