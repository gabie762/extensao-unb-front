import type { Projeto } from '~/types/projeto'

export function useProjetos() {
  const apiFetch = useApi()
  const { data: projetos, pending, error } = useAsyncData<Projeto[]>(
    'projetos',
    () => apiFetch<Projeto[]>('/projetos')
  )

  const termoBusca = ref('')

  const projetosFiltrados = computed(() => {
    if (!projetos.value) return []
    const consulta = termoBusca.value.trim().toLowerCase()
    if (!consulta) return projetos.value
    return projetos.value.filter((projeto) =>
      [projeto.titulo, projeto.resumo, projeto.descricao, projeto.coordenador?.nome, projeto.area, projeto.unidadeResponsavel]
        .join(' ')
        .toLowerCase()
        .includes(consulta)
    )
  })

  return {
    projetos,
    pending,
    error,
    searchTerm: termoBusca,
    filteredProjects: projetosFiltrados
  }
}
