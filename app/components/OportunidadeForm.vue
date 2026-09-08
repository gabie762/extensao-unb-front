<script setup lang="ts">
import type { OportunidadeCard } from '~/types/oportunidade'

const props = defineProps<{
  oportunidade?: OportunidadeCard | null
  loading?: boolean
  error?: string
  submitLabel: string
  cancelTo: string | Record<string, unknown>
}>()

const emit = defineEmits<{
  submit: [payload: Record<string, unknown>]
}>()

const form = reactive({
  titulo: props.oportunidade?.titulo ?? '',
  descricao: props.oportunidade?.descricao ?? '',
  sobreProjeto: props.oportunidade?.sobreProjeto ?? '',
  tipo: props.oportunidade?.tipo ?? 'bolsa' as 'bolsa' | 'voluntariado',
  local: props.oportunidade?.local ?? '',
  cargaHoraria: props.oportunidade?.cargaHoraria ?? '',
  vagas: props.oportunidade?.vagas,
  prazoInscricao: props.oportunidade?.prazoInscricao ?? '',
  certificado: props.oportunidade?.certificado ?? false,
  objetivosInput: props.oportunidade?.objetivos?.join('\n') ?? '',
  atividadesInput: props.oportunidade?.atividadesDesenvolvidas?.join('\n') ?? '',
  comoParticiparInput: props.oportunidade?.comoParticipar?.join('\n') ?? '',
  requisitosInput: props.oportunidade?.requisitos?.join(', ') ?? ''
})

const tipoOptions = [
  { label: 'Bolsa', value: 'bolsa' as const },
  { label: 'Voluntariado', value: 'voluntariado' as const }
]

const validationError = ref('')

function linhas(texto: string) {
  return texto
    .split('\n')
    .map((linha) => linha.trim())
    .filter(Boolean)
}

function handleSubmit() {
  validationError.value = ''

  if (!form.titulo || !form.descricao || !form.local || !form.cargaHoraria || !form.prazoInscricao) {
    validationError.value = 'Por favor, preencha todos os campos obrigatórios.'
    return
  }

  emit('submit', {
    titulo: form.titulo,
    descricao: form.descricao,
    sobreProjeto: form.sobreProjeto || undefined,
    tipo: form.tipo,
    local: form.local,
    cargaHoraria: form.cargaHoraria,
    vagas: form.vagas,
    prazoInscricao: form.prazoInscricao,
    certificado: form.certificado,
    objetivos: linhas(form.objetivosInput),
    atividadesDesenvolvidas: linhas(form.atividadesInput),
    comoParticipar: linhas(form.comoParticiparInput),
    requisitos: form.requisitosInput.split(',').map((r) => r.trim()).filter(Boolean)
  })
}
</script>

<template>
  <UCard class="rounded-xl">
    <form class="grid gap-5" @submit.prevent="handleSubmit">
      <UFormField label="Título" required class="w-full">
        <UInput v-model="form.titulo" placeholder="Ex: Bolsista de desenvolvimento web" size="xl" class="w-full" />
      </UFormField>

      <UFormField label="Descrição" required class="w-full">
        <UTextarea v-model="form.descricao" placeholder="Descreva a vaga e as responsabilidades" :rows="4" size="xl" class="w-full" />
      </UFormField>

      <UFormField label="Sobre o projeto" hint="Opcional — contexto adicional exibido na página da vaga" class="w-full">
        <UTextarea v-model="form.sobreProjeto" :rows="3" size="xl" class="w-full" />
      </UFormField>

      <UFormField label="Tipo" required class="w-full">
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="opt in tipoOptions"
            :key="opt.value"
            type="button"
            class="px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-all cursor-pointer"
            :class="form.tipo === opt.value
              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'"
            @click="form.tipo = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
      </UFormField>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <UFormField label="Local" required class="w-full">
          <UInput v-model="form.local" placeholder="Ex: Faculdade de Tecnologia" size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Carga horária" required class="w-full">
          <UInput v-model="form.cargaHoraria" placeholder="Ex: 20h semanais" size="xl" class="w-full" />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <UFormField label="Vagas" class="w-full">
          <UInput v-model.number="form.vagas" type="number" min="0" size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Prazo de inscrição" required class="w-full">
          <UInput v-model="form.prazoInscricao" type="date" size="xl" class="w-full" />
        </UFormField>
      </div>

      <UFormField label="Oferece certificado?" class="w-full">
        <UCheckbox v-model="form.certificado" label="Sim, esta vaga oferece certificado" />
      </UFormField>

      <UFormField label="Requisitos" hint="Separe por vírgula" class="w-full">
        <UInput v-model="form.requisitosInput" placeholder="Ex: Cursando graduação, disponibilidade de 20h" size="xl" class="w-full" />
      </UFormField>

      <UFormField label="Objetivos" hint="Um por linha" class="w-full">
        <UTextarea v-model="form.objetivosInput" :rows="3" size="xl" class="w-full" />
      </UFormField>

      <UFormField label="Atividades desenvolvidas" hint="Uma por linha" class="w-full">
        <UTextarea v-model="form.atividadesInput" :rows="3" size="xl" class="w-full" />
      </UFormField>

      <UFormField label="Como participar" hint="Um passo por linha" class="w-full">
        <UTextarea v-model="form.comoParticiparInput" :rows="3" size="xl" class="w-full" />
      </UFormField>

      <div v-if="validationError || error" class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-600 dark:text-red-400 text-sm text-center border border-red-100 dark:border-red-900/30">
        {{ validationError || error }}
      </div>

      <div class="flex justify-end gap-3">
        <UButton :to="cancelTo" color="neutral" variant="ghost" size="xl">Cancelar</UButton>
        <UButton type="submit" size="xl" :loading="loading" class="font-bold">{{ submitLabel }}</UButton>
      </div>
    </form>
  </UCard>
</template>
