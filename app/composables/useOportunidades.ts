import type {
  Oportunidade,
  OportunidadeFiltro,
  OportunidadeCertificadoFiltro,
  OportunidadePrazoFiltro,
  OpcaoFiltroGenerica
} from '~/types/oportunidade'
import { filterOptions, opportunities } from '~/data/oportunidades'

export function useOportunidades() {
  const searchTerm = ref('')
  const showFilters = ref(false)
  const activeFilter = ref<OportunidadeFiltro>('todos')
  const activeArea = ref('todas')
  const activeCertificado = ref<OportunidadeCertificadoFiltro>('todos')
  const activePrazo = ref<OportunidadePrazoFiltro>('todos')

  const areaOptions = computed(() => {
    const areas = Array.from(new Set(opportunities.map((opportunity) => opportunity.projeto.area))).sort()

    return [
      { label: 'Todas as áreas', value: 'todas' },
      ...areas.map((area) => ({ label: area, value: area }))
    ]
  })

  const certificadoOptions: OpcaoFiltroGenerica<OportunidadeCertificadoFiltro>[] = [
    { label: 'Certificado: todos', value: 'todos' },
    { label: 'Com certificado', value: 'com' },
    { label: 'Sem certificado', value: 'sem' }
  ]

  const prazoOptions: OpcaoFiltroGenerica<OportunidadePrazoFiltro>[] = [
    { label: 'Qualquer prazo', value: 'todos' },
    { label: 'Até 7 dias', value: '7' },
    { label: 'Até 15 dias', value: '15' },
    { label: 'Até 30 dias', value: '30' }
  ]

  const filteredOpportunities = computed(() => {
    const query = searchTerm.value.trim().toLowerCase()
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    return opportunities.filter((opportunity) => {
      const matchesFilter = activeFilter.value === 'todos' || opportunity.tipo === activeFilter.value
      const matchesArea = activeArea.value === 'todas' || opportunity.projeto.area === activeArea.value
      const matchesCertificado =
        activeCertificado.value === 'todos' ||
        (activeCertificado.value === 'com' && opportunity.certificado) ||
        (activeCertificado.value === 'sem' && !opportunity.certificado)

      const matchesPrazo = (() => {
        if (activePrazo.value === 'todos') {
          return true
        }

        const deadline = new Date(`${opportunity.prazoInscricao}T00:00:00`)
        const diffInDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

        return diffInDays >= 0 && diffInDays <= Number(activePrazo.value)
      })()

      const matchesSearch =
        query.length === 0 ||
        [
          opportunity.titulo,
          opportunity.descricao,
          opportunity.projeto.titulo,
          opportunity.projeto.area,
          opportunity.projeto.unidadeResponsavel,
          opportunity.local,
          ...opportunity.requisitos
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)

      return matchesFilter && matchesArea && matchesCertificado && matchesPrazo && matchesSearch
    })
  })

  function formatTipo(tipo: Oportunidade['tipo']) {
    return tipo === 'bolsa' ? 'bolsa' : 'voluntariado'
  }

  function formatPrazo(date: string) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(`${date}T00:00:00`))
  }

  return {
    opportunities,
    filterOptions,
    areaOptions,
    certificadoOptions,
    prazoOptions,
    searchTerm,
    showFilters,
    activeFilter,
    activeArea,
    activeCertificado,
    activePrazo,
    filteredOpportunities,
    formatTipo,
    formatPrazo
  }
}
