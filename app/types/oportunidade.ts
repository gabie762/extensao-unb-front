import type { Projeto } from './projeto'

export interface Oportunidade {
  projetoId: string
  projeto: Projeto
  titulo: string
  descricao: string
  requisitos: string[]
  prazoInscricao: string
  tipo: 'bolsa' | 'voluntariado'
}

export interface OportunidadeCard extends Oportunidade {
  id: string
  local: string
  cargaHoraria: string
}

export type OportunidadeFiltro = 'todos' | Oportunidade['tipo']

export interface OpcaoFiltroOportunidade {
  label: string
  value: OportunidadeFiltro
}