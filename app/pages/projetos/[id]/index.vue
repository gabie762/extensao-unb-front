<script setup lang="ts">
import type { Projeto } from '~/types/projeto'
import type { OportunidadeCard } from '~/types/oportunidade'
import type { Evento } from '~/types/evento'

const route = useRoute()
const apiFetch = useApi()
const { user } = useAuth()

const { data: projeto, pending, error } = useAsyncData<Projeto>(
  `projeto-${route.params.id}`,
  () => apiFetch<Projeto>(`/projetos/${route.params.id}`)
)

const { data: oportunidadesDoProjeto } = useAsyncData<OportunidadeCard[]>(
  `projeto-${route.params.id}-oportunidades`,
  () => apiFetch<OportunidadeCard[]>(`/oportunidades/projeto/${route.params.id}`)
)

const { data: eventosDoProjeto } = useAsyncData<Evento[]>(
  `projeto-${route.params.id}-eventos`,
  () => apiFetch<Evento[]>(`/eventos/projeto/${route.params.id}`)
)

const statusConfig = {
  aberto: { label: 'Aberto', color: 'success' as const },
  em_andamento: { label: 'Em andamento', color: 'primary' as const },
  encerrado: { label: 'Encerrado', color: 'neutral' as const }
}

const podeEditar = computed(() => {
  if (!user.value || !projeto.value) return false
  if (user.value.role === 'ROLE_ADMIN') return true
  return user.value.role === 'ROLE_PROFESSOR' && user.value.id === projeto.value.coordenador?.id
})

const excluindo = ref(false)

async function excluirProjeto() {
  if (!projeto.value) return
  if (!confirm(`Tem certeza que deseja excluir "${projeto.value.titulo}"? Essa ação não pode ser desfeita.`)) return

  excluindo.value = true
  try {
    await apiFetch(`/projetos/${projeto.value.id}`, { method: 'DELETE' })
    await refreshNuxtData()
    await navigateTo(backTo.value)
  } catch (err) {
    console.error(err)
    alert('Erro ao excluir o projeto. Tente novamente.')
  } finally {
    excluindo.value = false
  }
}

const excluindoOportunidadeId = ref<string | null>(null)

async function excluirOportunidade(oportunidade: OportunidadeCard) {
  if (!confirm(`Tem certeza que deseja excluir a oportunidade "${oportunidade.titulo}"? Essa ação não pode ser desfeita.`)) return

  excluindoOportunidadeId.value = oportunidade.id
  try {
    await apiFetch(`/oportunidades/${oportunidade.id}`, { method: 'DELETE' })
    await refreshNuxtData()
  } catch (err) {
    console.error(err)
    alert('Erro ao excluir a oportunidade. Tente novamente.')
  } finally {
    excluindoOportunidadeId.value = null
  }
}

const excluindoEventoId = ref<string | null>(null)

async function excluirEvento(evento: Evento) {
  if (!confirm(`Tem certeza que deseja excluir o evento "${evento.titulo}"? Essa ação não pode ser desfeita.`)) return

  excluindoEventoId.value = evento.id
  try {
    await apiFetch(`/eventos/${evento.id}`, { method: 'DELETE' })
    await refreshNuxtData()
  } catch (err) {
    console.error(err)
    alert('Erro ao excluir o evento. Tente novamente.')
  } finally {
    excluindoEventoId.value = null
  }
}

function formatarDataHora(valor: string | undefined | null) {
  if (!valor) return ''
  const date = new Date(valor)
  if (isNaN(date.getTime())) return valor
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const backTo = computed(() => {
  if (route.query.from === 'feed') return '/'
  if (route.query.from === 'oportunidades') return '/oportunidades'
  if (route.query.from === 'perfil') return '/perfil'
  return '/projetos'
})

const backLabel = computed(() => {
  if (route.query.from === 'feed') return '← Voltar para o início'
  if (route.query.from === 'oportunidades') return '← Voltar para oportunidades'
  if (route.query.from === 'perfil') return '← Voltar para o perfil'
  return '← Voltar para projetos'
})

const origemQuery = computed(() => (route.query.from ? { from: String(route.query.from) } : {}))

function formatarData(data: string | undefined | null) {
  if (!data) return 'Data não informada'
  const date = new Date(`${data}T00:00:00`)
  if (isNaN(date.getTime())) return data
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date)
}
</script>

<template>
  <div v-if="pending" class="flex justify-center py-16">
    <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary" />
  </div>

  <div v-else-if="error || !projeto" class="flex flex-col gap-4 py-8">
    <h1 class="m-0 text-2xl font-bold text-slate-900 dark:text-white">Projeto não encontrado</h1>
    <p class="m-0 text-slate-600 dark:text-slate-300">Não foi possível localizar os detalhes deste projeto.</p>
    <UButton to="/projetos" color="primary" variant="solid" class="w-fit">
      Voltar para projetos
    </UButton>
  </div>

  <section v-else class="flex flex-col gap-8">

    <!-- Navegação de retorno -->
    <div class="flex items-center justify-between gap-3">
      <NuxtLink :to="backTo" class="text-sm font-semibold text-primary hover:underline w-fit">
        {{ backLabel }}
      </NuxtLink>

      <div v-if="podeEditar" class="flex items-center gap-3 shrink-0">
        <UButton
          :to="{ path: `/projetos/${projeto.id}/editar`, query: origemQuery }"
          color="neutral"
          variant="outline"
          size="lg"
          icon="i-heroicons-pencil-square"
          class="font-semibold"
        >
          Editar
        </UButton>
        <UButton
          color="error"
          variant="outline"
          size="lg"
          icon="i-heroicons-trash"
          class="font-semibold"
          :loading="excluindo"
          @click="excluirProjeto"
        >
          Excluir
        </UButton>
      </div>
    </div>

    <!-- Header -->
    <header class="grid gap-4">
      <div class="flex flex-wrap items-center gap-2">
        <UBadge
          :color="statusConfig[projeto.status].color"
          variant="solid"
          class="font-bold px-3 py-1"
        >
          {{ statusConfig[projeto.status].label }}
        </UBadge>
        <UBadge color="primary" variant="soft" class="font-medium px-3 py-1">
          {{ projeto.area }}
        </UBadge>
      </div>

      <div class="grid gap-2">
        <p class="m-0 text-blue-600 text-sm font-bold tracking-wider uppercase">Projeto de Extensão</p>
        <h1 class="m-0 text-slate-900 dark:text-white text-[clamp(1.8rem,3vw,2.5rem)] font-bold tracking-tight leading-tight">
          {{ projeto.titulo }}
        </h1>
      </div>

      <div class="flex flex-wrap gap-2">
        <UBadge color="neutral" variant="outline" class="font-medium px-3 py-1">
          <UIcon name="i-heroicons-building-office" class="w-3.5 h-3.5 mr-1" />
          {{ projeto.unidadeResponsavel }}
        </UBadge>
      </div>
    </header>

    <!-- Strip de métricas -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
          <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div class="min-w-0">
          <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Status</p>
          <p class="text-[13px] font-bold m-0" :class="projeto.status === 'aberto' ? 'text-green-600 dark:text-green-400' : projeto.status === 'em_andamento' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'">
            {{ statusConfig[projeto.status].label }}
          </p>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
          <UIcon name="i-heroicons-users" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div class="min-w-0">
          <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Vagas</p>
          <p class="text-[13px] font-bold text-slate-900 dark:text-slate-100 m-0">{{ projeto.vagas }} disponíveis</p>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
          <UIcon name="i-heroicons-calendar-days" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div class="min-w-0">
          <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Cronograma</p>
          <p class="text-[13px] font-bold text-slate-900 dark:text-slate-100 m-0">{{ projeto.cronograma }}</p>
        </div>
      </div>
    </div>

    <!-- Layout principal: conteúdo + sidebar -->
    <div class="grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_360px] gap-6 items-start">

      <!-- Coluna esquerda: conteúdo principal -->
      <div class="flex flex-col gap-5">

        <!-- Resumo -->
        <div v-if="projeto.resumo" class="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 md:p-6">
          <div class="flex items-center gap-2 mb-3">
            <UIcon name="i-heroicons-document-text" class="w-5 h-5 text-blue-600" />
            <h2 class="m-0 text-base font-bold text-slate-900 dark:text-white">Resumo</h2>
          </div>
          <p class="m-0 text-slate-700 dark:text-slate-300 leading-relaxed text-[15px]">{{ projeto.resumo }}</p>
        </div>

        <!-- Descrição -->
        <div v-if="projeto.descricao" class="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 md:p-6">
          <div class="flex items-center gap-2 mb-3">
            <UIcon name="i-heroicons-book-open" class="w-5 h-5 text-blue-600" />
            <h2 class="m-0 text-base font-bold text-slate-900 dark:text-white">Sobre o Projeto</h2>
          </div>
          <p class="m-0 text-slate-700 dark:text-slate-300 leading-relaxed text-[15px]">{{ projeto.descricao }}</p>
        </div>

        <!-- Próximo evento -->
        <div v-if="projeto.proximoEvento?.titulo" class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 md:p-6">
          <div class="flex items-center gap-2 mb-3">
            <UIcon name="i-heroicons-bell" class="w-5 h-5 text-blue-600" />
            <h2 class="m-0 text-base font-bold text-slate-900 dark:text-white">Próximo Evento</h2>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p class="m-0 font-semibold text-slate-900 dark:text-white">{{ projeto.proximoEvento.titulo }}</p>
              <p class="m-0 text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                {{ formatarData(projeto.proximoEvento.dataInicio) }}
              </p>
            </div>
            <UBadge color="primary" variant="soft" class="font-semibold w-fit">
              Em breve
            </UBadge>
          </div>
        </div>

        <!-- Estado vazio se não houver conteúdo -->
        <div v-if="!projeto.resumo && !projeto.descricao" class="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center">
          <UIcon name="i-heroicons-document" class="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p class="m-0 text-slate-500 dark:text-slate-400">Descrição do projeto ainda não disponível.</p>
        </div>

        <!-- Oportunidades vinculadas -->
        <div class="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 md:p-6">
          <div class="flex items-center justify-between gap-3 mb-3">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-paper-airplane" class="w-5 h-5 text-blue-600" />
              <h2 class="m-0 text-base font-bold text-slate-900 dark:text-white">Oportunidades desta ação</h2>
            </div>
            <UButton
              v-if="podeEditar"
              :to="{ path: `/projetos/${projeto.id}/oportunidades/novo`, query: origemQuery }"
              color="primary"
              variant="soft"
              size="sm"
              icon="i-heroicons-plus"
              class="font-semibold shrink-0"
            >
              Nova oportunidade
            </UButton>
          </div>

          <div v-if="oportunidadesDoProjeto?.length" class="grid gap-2">
            <div
              v-for="oportunidade in oportunidadesDoProjeto"
              :key="oportunidade.id"
              class="flex items-center justify-between gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <NuxtLink
                :to="`/oportunidades/${oportunidade.id}`"
                class="min-w-0 flex-1 no-underline"
              >
                <p class="m-0 text-sm font-semibold text-slate-900 dark:text-white truncate hover:text-primary transition-colors">{{ oportunidade.titulo }}</p>
                <p class="m-0 text-xs text-slate-500 dark:text-slate-400 mt-0.5">Prazo: {{ formatarData(oportunidade.prazoInscricao) }}</p>
              </NuxtLink>
              <div class="flex items-center gap-2 shrink-0">
                <UBadge :color="oportunidade.tipo === 'bolsa' ? 'primary' : 'secondary'" variant="soft" class="shrink-0 font-semibold capitalize">
                  {{ oportunidade.tipo }}
                </UBadge>
                <template v-if="podeEditar">
                  <UButton
                    :to="{ path: `/projetos/${projeto.id}/oportunidades/${oportunidade.id}/editar`, query: origemQuery }"
                    color="neutral"
                    variant="outline"
                    size="lg"
                    icon="i-heroicons-pencil-square"
                    aria-label="Editar oportunidade"
                  />
                  <UButton
                    color="error"
                    variant="outline"
                    size="lg"
                    icon="i-heroicons-trash"
                    aria-label="Excluir oportunidade"
                    :loading="excluindoOportunidadeId === oportunidade.id"
                    @click="excluirOportunidade(oportunidade)"
                  />
                </template>
              </div>
            </div>
          </div>
          <p v-else class="m-0 text-sm text-slate-500 dark:text-slate-400">Nenhuma oportunidade publicada para esta ação ainda.</p>
        </div>

        <!-- Eventos vinculados -->
        <div class="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 md:p-6">
          <div class="flex items-center justify-between gap-3 mb-3">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-calendar-days" class="w-5 h-5 text-blue-600" />
              <h2 class="m-0 text-base font-bold text-slate-900 dark:text-white">Eventos desta ação</h2>
            </div>
            <UButton
              v-if="podeEditar"
              :to="{ path: `/projetos/${projeto.id}/eventos/novo`, query: origemQuery }"
              color="primary"
              variant="soft"
              size="sm"
              icon="i-heroicons-plus"
              class="font-semibold shrink-0"
            >
              Novo evento
            </UButton>
          </div>

          <div v-if="eventosDoProjeto?.length" class="grid gap-2">
            <div
              v-for="evento in eventosDoProjeto"
              :key="evento.id"
              class="flex items-center justify-between gap-3 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <div class="min-w-0 flex-1">
                <p class="m-0 text-sm font-semibold text-slate-900 dark:text-white truncate">{{ evento.titulo }}</p>
                <p class="m-0 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {{ formatarDataHora(evento.inicioEm) }}<span v-if="evento.local"> • {{ evento.local }}</span>
                </p>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <UBadge v-if="evento.tipo" color="neutral" variant="soft" class="shrink-0 font-medium capitalize">
                  {{ evento.tipo }}
                </UBadge>
                <template v-if="podeEditar">
                  <UButton
                    :to="{ path: `/projetos/${projeto.id}/eventos/${evento.id}/editar`, query: origemQuery }"
                    color="neutral"
                    variant="outline"
                    size="lg"
                    icon="i-heroicons-pencil-square"
                    aria-label="Editar evento"
                  />
                  <UButton
                    color="error"
                    variant="outline"
                    size="lg"
                    icon="i-heroicons-trash"
                    aria-label="Excluir evento"
                    :loading="excluindoEventoId === evento.id"
                    @click="excluirEvento(evento)"
                  />
                </template>
              </div>
            </div>
          </div>
          <p v-else class="m-0 text-sm text-slate-500 dark:text-slate-400">Nenhum evento cadastrado para esta ação ainda.</p>
        </div>
      </div>

      <!-- Coluna direita: sidebar -->
      <div class="flex flex-col gap-4">

        <!-- Card: Coordenação -->
        <UCard class="rounded-xl border-slate-200 dark:border-slate-700">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-user-circle" class="w-5 h-5 text-blue-600" />
              <h2 class="m-0 text-base font-bold text-slate-900 dark:text-white">Coordenação</h2>
            </div>
          </template>
          <div class="flex items-start gap-3">
            <div class="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
              <span class="text-white font-bold text-lg">
                {{ projeto.coordenador?.nome?.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div class="grid gap-0.5 min-w-0">
              <p class="m-0 text-sm font-bold text-slate-900 dark:text-white">{{ projeto.coordenador?.nome }}</p>
              <p v-if="projeto.coordenador?.departamento" class="m-0 text-xs text-slate-500 dark:text-slate-400">
                {{ projeto.coordenador.departamento }}
              </p>
              <a
                :href="`mailto:${projeto.coordenador?.email}`"
                class="text-xs text-primary hover:underline mt-1 w-fit truncate block"
              >
                {{ projeto.coordenador?.email }}
              </a>
            </div>
          </div>
        </UCard>

        <!-- Card: Informações do projeto -->
        <UCard class="rounded-xl border-slate-200 dark:border-slate-700">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-600" />
              <h2 class="m-0 text-base font-bold text-slate-900 dark:text-white">Informações</h2>
            </div>
          </template>
          <div class="grid gap-2">
            <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Área do Conhecimento</p>
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 m-0 mt-1">{{ projeto.area }}</p>
            </div>
            <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Unidade Responsável</p>
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 m-0 mt-1">{{ projeto.unidadeResponsavel }}</p>
            </div>
            <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Vagas Disponíveis</p>
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 m-0 mt-1">{{ projeto.vagas }}</p>
            </div>
            <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
              <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Cronograma</p>
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 m-0 mt-1">{{ projeto.cronograma }}</p>
            </div>
          </div>
        </UCard>

        <!-- Card: Oportunidades -->
        <UCard class="rounded-xl border-slate-200 dark:border-slate-700 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-paper-airplane" class="w-5 h-5 text-blue-600" />
              <h2 class="m-0 text-base font-bold text-slate-900 dark:text-white">Quer participar?</h2>
            </div>
            <p class="m-0 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Veja as oportunidades abertas de bolsa e voluntariado vinculadas a projetos de extensão.
            </p>
            <UButton
              to="/oportunidades"
              color="primary"
              variant="solid"
              size="md"
              class="w-full justify-center font-bold"
              icon="i-heroicons-magnifying-glass"
            >
              Ver Oportunidades
            </UButton>
          </div>
        </UCard>

      </div>
    </div>
  </section>
</template>
