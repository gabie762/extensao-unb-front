<script setup lang="ts">
import type { Projeto } from '~/types/projeto'

definePageMeta({
  middleware: 'professor'
})

const apiFetch = useApi()
const { user } = useAuth()

const form = reactive({
  titulo: '',
  area: '',
  unidadeResponsavel: '',
  resumo: '',
  cronograma: '',
  vagas: undefined as number | undefined,
  tagsInput: '',
  proximoEventoTitulo: '',
  proximoEventoData: ''
})

const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  error.value = ''

  if (!form.titulo || !form.area || !form.unidadeResponsavel || !form.resumo) {
    error.value = 'Por favor, preencha todos os campos obrigatórios.'
    return
  }

  if (!user.value?.id) {
    error.value = 'Não foi possível identificar o usuário logado. Faça login novamente.'
    return
  }

  const tags = form.tagsInput
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

  const body: Record<string, unknown> = {
    titulo: form.titulo,
    area: form.area,
    unidadeResponsavel: form.unidadeResponsavel,
    resumo: form.resumo,
    coordenador: user.value.id,
    cronograma: form.cronograma || undefined,
    tags: tags.length ? tags : undefined,
    vagas: form.vagas
  }

  if (form.proximoEventoTitulo && form.proximoEventoData) {
    body.proximoEvento = {
      titulo: form.proximoEventoTitulo,
      dataInicio: form.proximoEventoData
    }
  }

  loading.value = true
  try {
    const projetoCriado = await apiFetch<Projeto>('/projetos', {
      method: 'POST',
      body
    })

    await navigateTo(`/projetos/${projetoCriado.id}`)
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
      <NuxtLink to="/projetos" class="text-sm font-semibold text-primary hover:underline w-fit">
        ← Voltar para projetos
      </NuxtLink>
      <p class="m-0 text-blue-600 text-sm font-bold tracking-wider uppercase">Nova ação</p>
      <h1 class="m-0 text-slate-900 dark:text-white text-[clamp(2rem,3vw,2.5rem)] font-bold tracking-tight">
        Cadastrar ação de extensão
      </h1>
      <p class="max-w-[720px] m-0 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
        Preencha as informações abaixo para publicar um novo projeto de extensão.
      </p>
    </header>

    <UCard class="rounded-xl">
      <form class="grid gap-5" @submit.prevent="handleSubmit">
        <UFormField label="Título" required class="w-full">
          <UInput
            v-model="form.titulo"
            placeholder="Nome da ação de extensão"
            size="xl"
            class="w-full"
          />
        </UFormField>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <UFormField label="Área" required class="w-full">
            <UInput
              v-model="form.area"
              placeholder="Ex: Tecnologia, Saúde, Educação"
              size="xl"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Unidade responsável" required class="w-full">
            <UInput
              v-model="form.unidadeResponsavel"
              placeholder="Ex: Faculdade de Tecnologia"
              size="xl"
              class="w-full"
            />
          </UFormField>
        </div>

        <UFormField label="Resumo" required class="w-full">
          <UTextarea
            v-model="form.resumo"
            placeholder="Descreva brevemente os objetivos e atividades da ação"
            :rows="4"
            size="xl"
            class="w-full"
          />
        </UFormField>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <UFormField label="Cronograma" class="w-full">
            <UInput
              v-model="form.cronograma"
              placeholder="Ex: Março/2026 - Dezembro/2026"
              size="xl"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Vagas" class="w-full">
            <UInput
              v-model.number="form.vagas"
              type="number"
              min="0"
              placeholder="Número de vagas"
              size="xl"
              class="w-full"
            />
          </UFormField>
        </div>

        <UFormField label="Tags" hint="Separe por vírgula" class="w-full">
          <UInput
            v-model="form.tagsInput"
            placeholder="Ex: pesquisa, comunidade, tecnologia"
            size="xl"
            class="w-full"
          />
        </UFormField>

        <div class="border-t border-slate-200 dark:border-slate-700 pt-5 grid gap-5">
          <h2 class="m-0 text-slate-900 dark:text-white text-base font-bold">Próximo evento (opcional)</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <UFormField label="Título do evento" class="w-full">
              <UInput
                v-model="form.proximoEventoTitulo"
                placeholder="Ex: Reunião de abertura"
                size="xl"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Data de início" class="w-full">
              <UInput
                v-model="form.proximoEventoData"
                type="date"
                size="xl"
                class="w-full"
              />
            </UFormField>
          </div>
        </div>

        <div v-if="error" class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-600 dark:text-red-400 text-sm text-center border border-red-100 dark:border-red-900/30">
          {{ error }}
        </div>

        <div class="flex justify-end gap-3">
          <UButton to="/projetos" color="neutral" variant="ghost" size="xl">
            Cancelar
          </UButton>
          <UButton type="submit" size="xl" :loading="loading" class="font-bold">
            Cadastrar ação
          </UButton>
        </div>
      </form>
    </UCard>
  </section>
</template>
