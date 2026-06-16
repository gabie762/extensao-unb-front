import type { ProximoEvento } from './evento'
import type { Usuario } from './usuario'

export interface Projeto {
  id: string
  titulo: string
  unidadeResponsavel: string,
  resumo: string,
  coordenador: Usuario,
  cronograma: string,
  tags: string[]
  status: 'aberto' | 'em_andamento' | 'encerrado'
  quantidadeParticipantes: number,
  proximoEvento: ProximoEvento
}