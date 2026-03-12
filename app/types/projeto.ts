import type { Usuario } from './usuario'

export interface Projeto {
  id: string
  titulo: string
  area: string
  descricao: string
  professor: Usuario
  tags: string[]
  status: 'aberto' | 'em_andamento' | 'encerrado'
  vagas: number
  createdAt: string
}