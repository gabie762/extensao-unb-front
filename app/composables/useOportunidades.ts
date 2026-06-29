import type {
  OportunidadeCard,
  OportunidadeFiltro,
  OportunidadeCertificadoFiltro,
  OportunidadePrazoFiltro,
  OpcaoFiltroGenerica
} from '~/types/oportunidade'
import { filterOptions as opcoesFiltro } from '~/data/oportunidades'

export function useOportunidades() {
  const config = useRuntimeConfig()
  const { data: oportunidades, refresh, pending, error } = useFetch<OportunidadeCard[]>('/oportunidades', {
    baseURL: config.public.apiBase
  })

  const termoBusca = ref('')
  const mostrarFiltros = ref(false)
  const filtroAtivo = ref<OportunidadeFiltro>('todos')
  const filtroCertificadoAtivo = ref<OportunidadeCertificadoFiltro>('todos')
  const filtroPrazoAtivo = ref<OportunidadePrazoFiltro>('todos')

  const opcoesCertificado: OpcaoFiltroGenerica<OportunidadeCertificadoFiltro>[] = [
    { label: 'Certificado: todos', value: 'todos' },
    { label: 'Com certificado', value: 'com' },
    { label: 'Sem certificado', value: 'sem' }
  ]

  const opcoesPrazo: OpcaoFiltroGenerica<OportunidadePrazoFiltro>[] = [
    { label: 'Qualquer prazo', value: 'todos' },
    { label: 'Até 7 dias', value: '7' },
    { label: 'Até 15 dias', value: '15' },
    { label: 'Até 30 dias', value: '30' }
  ]

  const oportunidadesFiltradas = computed(() => {
    if (!oportunidades.value) return []
    
    const consulta = termoBusca.value.trim().toLowerCase()
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    return oportunidades.value.filter((oportunidade) => {
      const correspondeFiltro = filtroAtivo.value === 'todos' || oportunidade.tipo === filtroAtivo.value
      const correspondeCertificado =
        filtroCertificadoAtivo.value === 'todos' ||
        (filtroCertificadoAtivo.value === 'com' && oportunidade.certificado) ||
        (filtroCertificadoAtivo.value === 'sem' && !oportunidade.certificado)

      const correspondePrazo = (() => {
        if (filtroPrazoAtivo.value === 'todos') {
          return true
        }

        const prazoLimite = new Date(`${oportunidade.prazoInscricao}T00:00:00`)
        const diferencaEmDias = Math.ceil((prazoLimite.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))

        return diferencaEmDias >= 0 && diferencaEmDias <= Number(filtroPrazoAtivo.value)
      })()

      const correspondeBusca =
        consulta.length === 0 ||
        [
          oportunidade.titulo,
          oportunidade.descricao,
          oportunidade.projeto?.titulo,
          oportunidade.projeto?.unidadeResponsavel,
          oportunidade.local,
          ...(oportunidade.requisitos || [])
        ]
          .join(' ')
          .toLowerCase()
          .includes(consulta)

      return correspondeFiltro && correspondeCertificado && correspondePrazo && correspondeBusca
    })
  })

  function formatarTipo(tipo: OportunidadeCard['tipo']) {
    return tipo === 'bolsa' ? 'bolsa' : 'voluntariado'
  }

  function formatarPrazo(data: string) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(`${data}T00:00:00`))
  }

  const quantidadeFiltrosAtivos = computed(() => {
    let quantidade = 0
    if (termoBusca.value.trim().length > 0) quantidade++
    if (filtroAtivo.value !== 'todos') quantidade++
    if (filtroCertificadoAtivo.value !== 'todos') quantidade++
    if (filtroPrazoAtivo.value !== 'todos') quantidade++
    return quantidade
  })

  const etiquetasFiltrosAtivos = computed(() => {
    const etiquetas: string[] = []

    if (filtroAtivo.value !== 'todos') {
      const etiquetaFiltro = opcoesFiltro.find((opcao) => opcao.value === filtroAtivo.value)?.label
      if (etiquetaFiltro) etiquetas.push(etiquetaFiltro)
    }

    if (filtroCertificadoAtivo.value !== 'todos') {
      const etiquetaCertificado = opcoesCertificado.find((opcao) => opcao.value === filtroCertificadoAtivo.value)?.label
      if (etiquetaCertificado) etiquetas.push(etiquetaCertificado)
    }

    if (filtroPrazoAtivo.value !== 'todos') {
      const etiquetaPrazo = opcoesPrazo.find((opcao) => opcao.value === filtroPrazoAtivo.value)?.label
      if (etiquetaPrazo) etiquetas.push(etiquetaPrazo)
    }

    return etiquetas
  })

  function limparFiltros() {
    termoBusca.value = ''
    filtroAtivo.value = 'todos'
    filtroCertificadoAtivo.value = 'todos'
    filtroPrazoAtivo.value = 'todos'
  }

  return {
    oportunidades,
    pending,
    error,
    refresh,
    filterOptions: opcoesFiltro,
    certificadoOptions: opcoesCertificado,
    prazoOptions: opcoesPrazo,
    searchTerm: termoBusca,
    showFilters: mostrarFiltros,
    activeFilter: filtroAtivo,
    activeCertificado: filtroCertificadoAtivo,
    activePrazo: filtroPrazoAtivo,
    filteredOpportunities: oportunidadesFiltradas,
    formatTipo: formatarTipo,
    formatPrazo: formatarPrazo,
    activeFiltersCount: quantidadeFiltrosAtivos,
    activeFiltersLabels: etiquetasFiltrosAtivos,
    resetAllFilters: limparFiltros
  }
}
