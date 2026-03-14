import type { OportunidadeCard, OpcaoFiltroOportunidade } from '~/types/oportunidade'

export const opportunities: OportunidadeCard[] = [
  {
    id: 'opp-1',
    projetoId: 'proj-1',
    titulo: 'Bolsa de apoio em pesquisa e análise de dados educacionais',
    descricao:
      'Atue no acompanhamento de indicadores acadêmicos, construção de relatórios e organização de painéis para apoiar ações de permanência estudantil.',
    requisitos: ['Conhecimento básico em planilhas', 'Organização', 'Interesse em análise de dados'],
    prazoInscricao: '2026-03-18',
    tipo: 'bolsa',
    local: 'Campus Darcy Ribeiro',
    cargaHoraria: '12h semanais',
    projeto: {
      id: 'proj-1',
      titulo: 'Observatório de dados para permanência estudantil',
      area: 'Ciências Humanas',
      unidadeResponsavel: 'Faculdade de Educação (FE)',
      descricao: 'Projeto voltado ao uso de dados para melhorar políticas de acompanhamento estudantil.',
      professor: {
        id: 'prof-1',
        nome: 'Profa. Mariana Silva',
        email: 'mariana.silva@unb.br',
        role: 'professor',
        departamento: 'Faculdade de Educação'
      },
      tags: ['Dados', 'Educação'],
      status: 'aberto',
      vagas: 2,
      createdAt: '2026-03-01'
    }
  },
  {
    id: 'opp-2',
    projetoId: 'proj-2',
    titulo: 'Voluntariado em ações de extensão para inclusão digital',
    descricao:
      'Colabore em oficinas introdutórias de tecnologia para a comunidade e ajude na facilitação das atividades presenciais do projeto.',
    requisitos: ['Boa comunicação', 'Interesse em impacto social', 'Disponibilidade aos sábados'],
    prazoInscricao: '2026-03-22',
    tipo: 'voluntariado',
    local: 'Ceilândia e atividades híbridas',
    cargaHoraria: '8h semanais',
    projeto: {
      id: 'proj-2',
      titulo: 'Conecta Comunidade',
      area: 'Ciências Sociais Aplicadas',
      unidadeResponsavel: 'Departamento de Ciência da Computação (CIC)',
      descricao: 'Iniciativa que promove letramento digital em escolas e centros comunitários do DF.',
      professor: {
        id: 'prof-2',
        nome: 'Prof. Carlos Mendes',
        email: 'carlos.mendes@unb.br',
        role: 'professor',
        departamento: 'Departamento de Ciência da Computação'
      },
      tags: ['Extensão', 'Inclusão'],
      status: 'aberto',
      vagas: 6,
      createdAt: '2026-03-05'
    }
  },
  {
    id: 'opp-3',
    projetoId: 'proj-3',
    titulo: 'Bolsa para design de materiais de divulgação científica',
    descricao:
      'Produza peças digitais, organize conteúdos de redes sociais e apoie campanhas de divulgação das ações do laboratório.',
    requisitos: ['Noções de design', 'Criatividade', 'Conhecimento básico em ferramentas visuais'],
    prazoInscricao: '2026-03-25',
    tipo: 'bolsa',
    local: 'Instituto Central de Ciências',
    cargaHoraria: '10h semanais',
    projeto: {
      id: 'proj-3',
      titulo: 'LabMídia Ciência Aberta',
      area: 'Linguística, Letras e Artes',
      unidadeResponsavel: 'Faculdade de Comunicação (FAC)',
      descricao: 'Projeto dedicado à divulgação científica acessível para diferentes públicos.',
      professor: {
        id: 'prof-3',
        nome: 'Profa. Helena Costa',
        email: 'helena.costa@unb.br',
        role: 'professor',
        departamento: 'Faculdade de Comunicação'
      },
      tags: ['Design', 'Divulgação'],
      status: 'aberto',
      vagas: 1,
      createdAt: '2026-03-08'
    }
  },
  {
    id: 'opp-4',
    projetoId: 'proj-4',
    titulo: 'Voluntariado em mentoria para calouros',
    descricao:
      'Apoie estudantes ingressantes com encontros de acolhimento, orientação sobre rotinas acadêmicas e suporte inicial nas primeiras semanas.',
    requisitos: ['Empatia', 'Boa escuta', 'Disponibilidade para encontros presenciais'],
    prazoInscricao: '2026-03-28',
    tipo: 'voluntariado',
    local: 'Campus Gama',
    cargaHoraria: '6h semanais',
    projeto: {
      id: 'proj-4',
      titulo: 'Rede de acolhimento estudantil',
      area: 'Ciências Humanas',
      unidadeResponsavel: 'Decanato de Assuntos Comunitários (DAC)',
      descricao: 'Programa de apoio e integração para novos estudantes da universidade.',
      professor: {
        id: 'prof-4',
        nome: 'Prof. Júlio Andrade',
        email: 'julio.andrade@unb.br',
        role: 'professor',
        departamento: 'Decanato de Assuntos Comunitários'
      },
      tags: ['Acolhimento', 'Mentoria'],
      status: 'aberto',
      vagas: 10,
      createdAt: '2026-03-10'
    }
  }
]

export const filterOptions: OpcaoFiltroOportunidade[] = [
  { label: 'Todas', value: 'todos' },
  { label: 'Bolsa', value: 'bolsa' },
  { label: 'Voluntariado', value: 'voluntariado' }
]
