<script setup lang="ts">
import type { Projeto } from '~/types/projeto'
import type { Evento } from '~/types/evento'

definePageMeta({
  middleware: 'professor'
})

const route = useRoute()
const apiFetch = useApi()
const { user } = useAuth()

const { data: projeto, pending, error: fetchError } = await useAsyncData<Projeto>(
  `projeto-evento-${route.params.id}`,
  () => apiFetch<Projeto>(`/projetos/${route.params.id}`)
)

const podeGerenciar = computed(() => {
  if (!user.value || !projeto.value) return false
  if (user.value.role === 'ROLE_ADMIN') return true
  return user.value.role === 'ROLE_PROFESSOR' && user.value.id === projeto.value.coordenador?.id
})

const form = reactive({
  titulo: '',
  inicioEm: '',
  fimEm: '',
  local: '',
  tipo: ''
})

const loading = ref(false)
const error = ref('')

function paraIso(valorLocal: string) {
  if (!valorLocal) return undefined
  const data = new Date(valorLocal)
  return isNaN(data.getTime()) ? undefined : data.toISOString()
}

async function handleSubmit() {
  error.value = ''

  if (!form.titulo || !form.inicioEm) {
    error.value = 'Por favor, preencha o título e a data de início.'
    return
  }

  if (!projeto.value) return

  const body: Record<string, unknown> = {
    projetoId: projeto.value.id,
    titulo: form.titulo,
    inicioEm: paraIso(form.inicioEm),
    fimEm: paraIso(form.fimEm),
    local: form.local || undefined,
    tipo: form.tipo || undefined
  }

  loading.value = true
  try {
    await apiFetch<Evento>('/eventos', {
      method: 'POST',
      body
    })

    await refreshNuxtData()
    await navigateTo(`/projetos/${projeto.value.id}`)
  } catch (err: any) {
    const status = err?.status ?? err?.response?.status
    error.value = status === 400
      ? 'Dados inválidos. Verifique os campos preenchidos.'
      : 'Erro ao criar o evento. Tente novamente.'
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
    <p class="m-0 text-slate-600 dark:text-slate-300">Você não tem permissão para criar eventos neste projeto.</p>
    <UButton :to="`/projetos/${projeto.id}`" color="primary" variant="solid" class="w-fit">Voltar para o projeto</UButton>
  </div>

  <section v-else class="flex flex-col gap-6 max-w-2xl mx-auto">
    <header class="grid gap-3">
      <NuxtLink :to="`/projetos/${projeto.id}`" class="text-sm font-semibold text-primary hover:underline w-fit">
        ← Voltar para o projeto
      </NuxtLink>
      <p class="m-0 text-blue-600 text-sm font-bold tracking-wider uppercase">Novo evento</p>
      <h1 class="m-0 text-slate-900 dark:text-white text-[clamp(2rem,3vw,2.5rem)] font-bold tracking-tight">
        Criar evento em "{{ projeto.titulo }}"
      </h1>
      <p class="max-w-[720px] m-0 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
        O evento aparecerá na agenda pública do site assim que for criado.
      </p>
    </header>

    <UCard class="rounded-xl">
      <form class="grid gap-5" @submit.prevent="handleSubmit">
        <UFormField label="Título" required class="w-full">
          <UInput v-model="form.titulo" placeholder="Ex: Workshop de iniciação científica" size="xl" class="w-full" />
        </UFormField>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <UFormField label="Início" required class="w-full">
            <UInput v-model="form.inicioEm" type="datetime-local" size="xl" class="w-full" />
          </UFormField>

          <UFormField label="Fim" hint="Opcional" class="w-full">
            <UInput v-model="form.fimEm" type="datetime-local" size="xl" class="w-full" />
          </UFormField>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <UFormField label="Local" class="w-full">
            <UInput v-model="form.local" placeholder="Ex: Auditório da Faculdade" size="xl" class="w-full" />
          </UFormField>

          <UFormField label="Tipo" hint="Ex: workshop, palestra, reunião" class="w-full">
            <UInput v-model="form.tipo" size="xl" class="w-full" />
          </UFormField>
        </div>

        <div v-if="error" class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-600 dark:text-red-400 text-sm text-center border border-red-100 dark:border-red-900/30">
          {{ error }}
        </div>

        <div class="flex justify-end gap-3">
          <UButton :to="`/projetos/${projeto.id}`" color="neutral" variant="ghost" size="xl">Cancelar</UButton>
          <UButton type="submit" size="xl" :loading="loading" class="font-bold">Criar evento</UButton>
        </div>
      </form>
    </UCard>
  </section>
</template>
