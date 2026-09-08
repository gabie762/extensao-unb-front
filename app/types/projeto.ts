import type { ProximoEvento } from './evento'
import type { Usuario } from './usuario'

export interface Projeto {
  id: string
  titulo: string
  area: string
  unidadeResponsavel: string
  resumo?: string
  descricao?: string
  coordenador: Usuario
  cronograma: string
  tags: string[]
  status: 'aberto' | 'em_andamento' | 'encerrado'
  vagas: number
  proximoEvento?: ProximoEvento
}
