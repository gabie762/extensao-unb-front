import type { Projeto } from './projeto'

export interface Oportunidade {
  projetoId: string
  projeto: Projeto
  titulo: string
  descricao: string
  sobreProjeto: string
  objetivos: string[]
  atividadesDesenvolvidas: string[]
  comoParticipar: string[]
  certificado: boolean
  requisitos: string[]
  vagas: number
  prazoInscricao: string
  tipo: 'bolsa' | 'voluntariado'
}

export interface OportunidadeCard extends Oportunidade {
  id: string
  local: string
  cargaHoraria: string
}

export type OportunidadeFiltro = 'todos' | Oportunidade['tipo']
export type OportunidadeCertificadoFiltro = 'todos' | 'com' | 'sem'
export type OportunidadePrazoFiltro = 'todos' | '7' | '15' | '30'

export interface OpcaoFiltroOportunidade {
  label: string
  value: OportunidadeFiltro
}

export interface OpcaoFiltroGenerica<T extends string> {
  label: string
  value: T
}