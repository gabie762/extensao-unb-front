<script setup lang="ts">
import type { Projeto } from '~/types/projeto'
import type { OportunidadeCard } from '~/types/oportunidade'

definePageMeta({
  middleware: 'professor'
})

const route = useRoute()
const apiFetch = useApi()
const { user } = useAuth()

const { data: projeto, pending, error: fetchError } = await useAsyncData<Projeto>(
  `projeto-oportunidade-${route.params.id}`,
  () => apiFetch<Projeto>(`/projetos/${route.params.id}`)
)

const podeGerenciar = computed(() => {
  if (!user.value || !projeto.value) return false
  if (user.value.role === 'ROLE_ADMIN') return true
  return user.value.role === 'ROLE_PROFESSOR' && user.value.id === projeto.value.coordenador?.id
})

const loading = ref(false)
const error = ref('')

const voltaAoProjeto = computed(() => ({
  path: `/projetos/${route.params.id}`,
  query: route.query.from ? { from: String(route.query.from) } : {}
}))

async function handleSubmit(payload: Record<string, unknown>) {
  if (!projeto.value) return

  error.value = ''
  loading.value = true
  try {
    await apiFetch<OportunidadeCard>('/oportunidades', {
      method: 'POST',
      body: { ...payload, projetoId: projeto.value.id }
    })

    await refreshNuxtData()
    await navigateTo(voltaAoProjeto.value)
  } catch (err: any) {
    const status = err?.status ?? err?.response?.status
    error.value = status === 400
      ? 'Dados inválidos. Verifique os campos preenchidos.'
      : 'Erro ao publicar a oportunidade. Tente novamente.'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="pending" class="flex justify-center py-16">
    <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary" />
  </div>

  <div v-else-if="fetchError || !projeto" class="flex flex-col gap-4 py-8">
    <h1 class="m-0 text-2xl font-bold text-slate-900 dark:text-white">Projeto não encontrado</h1>
    <UButton to="/projetos" color="primary" variant="solid" class="w-fit">Voltar para projetos</UButton>
  </div>

  <div v-else-if="!podeGerenciar" class="flex flex-col gap-4 py-8">
    <h1 class="m-0 text-2xl font-bold text-slate-900 dark:text-white">Acesso não permitido</h1>
    <p class="m-0 text-slate-600 dark:text-slate-300">Você não tem permissão para publicar vagas neste projeto.</p>
    <UButton :to="voltaAoProjeto" color="primary" variant="solid" class="w-fit">Voltar para o projeto</UButton>
  </div>

  <section v-else class="flex flex-col gap-6 max-w-3xl mx-auto">
    <header class="grid gap-3">
      <NuxtLink :to="voltaAoProjeto" class="text-sm font-semibold text-primary hover:underline w-fit">
        ← Voltar para o projeto
      </NuxtLink>
      <p class="m-0 text-blue-600 text-sm font-bold tracking-wider uppercase">Nova oportunidade</p>
      <h1 class="m-0 text-slate-900 dark:text-white text-[clamp(2rem,3vw,2.5rem)] font-bold tracking-tight">
        Publicar vaga em "{{ projeto.titulo }}"
      </h1>
      <p class="max-w-[720px] m-0 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
        Divulgue uma vaga de bolsa ou voluntariado vinculada a esta ação de extensão.
      </p>
    </header>

    <OportunidadeForm
      submit-label="Publicar vaga"
      :cancel-to="voltaAoProjeto"
      :loading="loading"
      :error="error"
      @submit="handleSubmit"
    />
  </section>
</template>
