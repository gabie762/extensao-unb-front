<script setup lang="ts">
import type { Projeto } from '~/types/projeto'

definePageMeta({
  middleware: 'professor'
})

const route = useRoute()
const apiFetch = useApi()
const { user } = useAuth()

const loading = ref(false)
const error = ref('')

const voltarPara = computed(() => (route.query.from === 'perfil' ? '/perfil' : '/projetos'))

async function handleSubmit(payload: Record<string, unknown>) {
  error.value = ''

  if (!user.value?.id) {
    error.value = 'Não foi possível identificar o usuário logado. Faça login novamente.'
    return
  }

  loading.value = true
  try {
    const projetoCriado = await apiFetch<Projeto>('/projetos', {
      method: 'POST',
      body: { ...payload, coordenador: user.value.id }
    })

    await refreshNuxtData()
    await navigateTo({ path: `/projetos/${projetoCriado.id}`, query: route.query.from ? { from: String(route.query.from) } : {} })
  } catch (err: any) {
    const status = err?.status ?? err?.response?.status
    if (status === 400) {
      error.value = 'Dados inválidos. Verifique os campos preenchidos.'
    } else {
      error.value = 'Erro ao cadastrar a ação de extensão. Tente novamente.'
    }
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="flex flex-col gap-6 max-w-3xl mx-auto">
    <header class="grid gap-3">
      <NuxtLink :to="voltarPara" class="text-sm font-semibold text-primary hover:underline w-fit">
        {{ route.query.from === 'perfil' ? '← Voltar para o perfil' : '← Voltar para projetos' }}
      </NuxtLink>
      <p class="m-0 text-blue-600 text-sm font-bold tracking-wider uppercase">Nova ação</p>
      <h1 class="m-0 text-slate-900 dark:text-white text-[clamp(2rem,3vw,2.5rem)] font-bold tracking-tight">
        Cadastrar ação de extensão
      </h1>
      <p class="max-w-[720px] m-0 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
        Preencha as informações abaixo para publicar um novo projeto de extensão.
      </p>
    </header>

    <ProjetoForm
      submit-label="Cadastrar ação"
      :cancel-to="voltarPara"
      :loading="loading"
      :error="error"
      @submit="handleSubmit"
    />
  </section>
</template>
