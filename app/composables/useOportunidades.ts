import type { Oportunidade, OportunidadeFiltro } from '~/types/oportunidade'
import { filterOptions, opportunities } from '~/data/oportunidades'

export function useOportunidades() {
  const searchTerm = ref('')
  const showFilters = ref(false)
  const activeFilter = ref<OportunidadeFiltro>('todos')

  const filteredOpportunities = computed(() => {
    const query = searchTerm.value.trim().toLowerCase()

    return opportunities.filter((opportunity) => {
      const matchesFilter = activeFilter.value === 'todos' || opportunity.tipo === activeFilter.value
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

      return matchesFilter && matchesSearch
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
    searchTerm,
    showFilters,
    activeFilter,
    filteredOpportunities,
    formatTipo,
    formatPrazo
  }
}
