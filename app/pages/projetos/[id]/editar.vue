<script setup lang="ts">
import type { Projeto } from '~/types/projeto'

definePageMeta({
  middleware: 'professor'
})

const route = useRoute()
const apiFetch = useApi()
const { user } = useAuth()

const { data: projeto, pending, error: fetchError } = await useAsyncData<Projeto>(
  `projeto-editar-${route.params.id}`,
  () => apiFetch<Projeto>(`/projetos/${route.params.id}`)
)

const podeEditar = computed(() => {
  if (!user.value || !projeto.value) return false
  if (user.value.role === 'ROLE_ADMIN') return true
  return user.value.role === 'ROLE_PROFESSOR' && user.value.id === projeto.value.coordenador?.id
})

const loading = ref(false)
const submitError = ref('')

async function handleSubmit(payload: Record<string, unknown>) {
  if (!projeto.value) return

  submitError.value = ''
  loading.value = true
  try {
    await apiFetch<Projeto>(`/projetos/${projeto.value.id}`, {
      method: 'PUT',
      body: { ...payload, coordenador: projeto.value.coordenador?.id }
    })

    await navigateTo(`/projetos/${projeto.value.id}`)
  } catch (err: any) {
    const status = err?.status ?? err?.response?.status
    if (status === 400) {
      submitError.value = 'Dados inválidos. Verifique os campos preenchidos.'
    } else {
      submitError.value = 'Erro ao salvar as alterações. Tente novamente.'
    }
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
    <p class="m-0 text-slate-600 dark:text-slate-300">Não foi possível localizar os detalhes deste projeto.</p>
    <UButton to="/projetos" color="primary" variant="solid" class="w-fit">
      Voltar para projetos
    </UButton>
  </div>

  <div v-else-if="!podeEditar" class="flex flex-col gap-4 py-8">
    <h1 class="m-0 text-2xl font-bold text-slate-900 dark:text-white">Acesso não permitido</h1>
    <p class="m-0 text-slate-600 dark:text-slate-300">Você não tem permissão para editar este projeto.</p>
    <UButton :to="`/projetos/${projeto.id}`" color="primary" variant="solid" class="w-fit">
      Voltar para o projeto
    </UButton>
  </div>

  <section v-else class="flex flex-col gap-6 max-w-3xl mx-auto">
    <header class="grid gap-3">
      <NuxtLink :to="`/projetos/${projeto.id}`" class="text-sm font-semibold text-primary hover:underline w-fit">
        ← Voltar para o projeto
      </NuxtLink>
      <p class="m-0 text-blue-600 text-sm font-bold tracking-wider uppercase">Editar ação</p>
      <h1 class="m-0 text-slate-900 dark:text-white text-[clamp(2rem,3vw,2.5rem)] font-bold tracking-tight">
        {{ projeto.titulo }}
      </h1>
      <p class="max-w-[720px] m-0 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
        Atualize as informações da sua ação de extensão.
      </p>
    </header>

    <ProjetoForm
      :projeto="projeto"
      submit-label="Salvar alterações"
      :loading="loading"
      :error="submitError"
      @submit="handleSubmit"
    />
  </section>
</template>
