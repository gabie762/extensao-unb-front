<script setup lang="ts">
import type { Projeto } from '~/types/projeto'

const props = defineProps<{
  projeto?: Projeto | null
  loading?: boolean
  error?: string
  submitLabel: string
}>()

const emit = defineEmits<{
  submit: [payload: Record<string, unknown>]
}>()

const form = reactive({
  titulo: props.projeto?.titulo ?? '',
  area: props.projeto?.area ?? '',
  unidadeResponsavel: props.projeto?.unidadeResponsavel ?? '',
  resumo: props.projeto?.resumo ?? '',
  cronograma: props.projeto?.cronograma ?? '',
  vagas: props.projeto?.vagas,
  tagsInput: props.projeto?.tags?.join(', ') ?? '',
  status: props.projeto?.status ?? 'aberto',
  proximoEventoTitulo: props.projeto?.proximoEvento?.titulo ?? '',
  proximoEventoData: props.projeto?.proximoEvento?.dataInicio ?? ''
})

const statusOptions = [
  { label: 'Aberto', value: 'aberto' as const },
  { label: 'Em andamento', value: 'em_andamento' as const },
  { label: 'Encerrado', value: 'encerrado' as const }
]

const validationError = ref('')

function handleSubmit() {
  validationError.value = ''

  if (!form.titulo || !form.area || !form.unidadeResponsavel || !form.resumo) {
    validationError.value = 'Por favor, preencha todos os campos obrigatórios.'
    return
  }

  const tags = form.tagsInput
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)

  const payload: Record<string, unknown> = {
    titulo: form.titulo,
    area: form.area,
    unidadeResponsavel: form.unidadeResponsavel,
    resumo: form.resumo,
    cronograma: form.cronograma || undefined,
    tags: tags.length ? tags : undefined,
    vagas: form.vagas,
    status: form.status
  }

  if (form.proximoEventoTitulo && form.proximoEventoData) {
    payload.proximoEvento = {
      titulo: form.proximoEventoTitulo,
      dataInicio: form.proximoEventoData
    }
  }

  emit('submit', payload)
}
</script>

<template>
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

      <UFormField v-if="projeto" label="Status" required class="w-full">
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="opt in statusOptions"
            :key="opt.value"
            type="button"
            class="px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-all cursor-pointer"
            :class="form.status === opt.value
              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'"
            @click="form.status = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
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

      <div v-if="validationError || error" class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-600 dark:text-red-400 text-sm text-center border border-red-100 dark:border-red-900/30">
        {{ validationError || error }}
      </div>

      <div class="flex justify-end gap-3">
        <UButton to="/projetos" color="neutral" variant="ghost" size="xl">
          Cancelar
        </UButton>
        <UButton type="submit" size="xl" :loading="loading" class="font-bold">
          {{ submitLabel }}
        </UButton>
      </div>
    </form>
  </UCard>
</template>
