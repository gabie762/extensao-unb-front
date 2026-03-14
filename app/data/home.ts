import type { AreaConhecimento } from '~/types/projeto'

export const projects = [
  {
    id: 1,
    title: 'Plataforma de monitoria com IA para disciplinas iniciais',
    area: 'Ciências Exatas e da Terra' as AreaConhecimento,
    unidadeResponsavel: 'Departamento de Ciência da Computação (CIC)',
    description:
      'Projeto para apoiar estudantes em Cálculo e Programação com trilhas de estudo, revisão automática e acompanhamento de progresso.',
    mentor: 'Prof. Ana Paula',
    schedule: 'Inscrições até 18/03',
    tags: ['IA', 'Ensino', 'Web App']
  },
  {
    id: 2,
    title: 'Mapa de oportunidades acadêmicas e extensão universitária',
    area: 'Ciências Sociais Aplicadas' as AreaConhecimento,
    unidadeResponsavel: 'Faculdade de Administração, Contabilidade, Economia e Gestão Pública (FACE)',
    description:
      'Centraliza bolsas, extensão, eventos e iniciativas estudantis para facilitar o acesso dos alunos a projetos ativos no campus.',
    mentor: 'PET Computação',
    schedule: 'Encontro quinta, 14h',
    tags: ['Extensão', 'Dados', 'Impacto social']
  },
  {
    id: 3,
    title: 'Laboratório de UX para serviços digitais da universidade',
    area: 'Linguística, Letras e Artes' as AreaConhecimento,
    unidadeResponsavel: 'Faculdade de Comunicação (FAC)',
    description:
      'Grupo multidisciplinar focado em melhorar sistemas internos da universidade com pesquisa com usuários, prototipação e validação.',
    mentor: 'Lab de Inovação',
    schedule: 'Vagas abertas',
    tags: ['UX', 'Pesquisa', 'Protótipos']
  }
]

export const events = [
  {
    id: 1,
    title: 'Workshop de iniciação científica',
    date: '12 Mar',
    time: '10:00',
    location: 'Auditório da Faculdade'
  },
  {
    id: 2,
    title: 'Plantão de projetos de extensão',
    date: '14 Mar',
    time: '15:30',
    location: 'Sala 204 - Bloco B'
  },
  {
    id: 3,
    title: 'Feira de grupos estudantis',
    date: '18 Mar',
    time: '09:00',
    location: 'Praça Central do Campus'
  }
]
