<script setup lang="ts">
import type { Evento } from '~/types/evento'

const props = defineProps<{
  evento?: Evento | null
  loading?: boolean
  error?: string
  submitLabel: string
  cancelTo: string | Record<string, unknown>
}>()

const emit = defineEmits<{
  submit: [payload: Record<string, unknown>]
}>()

function paraDatetimeLocal(valorIso: string | undefined) {
  if (!valorIso) return ''
  const data = new Date(valorIso)
  if (isNaN(data.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${data.getFullYear()}-${pad(data.getMonth() + 1)}-${pad(data.getDate())}T${pad(data.getHours())}:${pad(data.getMinutes())}`
}

const form = reactive({
  titulo: props.evento?.titulo ?? '',
  inicioEm: paraDatetimeLocal(props.evento?.inicioEm),
  fimEm: paraDatetimeLocal(props.evento?.fimEm),
  local: props.evento?.local ?? '',
  tipo: props.evento?.tipo ?? ''
})

const validationError = ref('')

function paraIso(valorLocal: string) {
  if (!valorLocal) return undefined
  const data = new Date(valorLocal)
  return isNaN(data.getTime()) ? undefined : data.toISOString()
}

function handleSubmit() {
  validationError.value = ''

  if (!form.titulo || !form.inicioEm) {
    validationError.value = 'Por favor, preencha o título e a data de início.'
    return
  }

  emit('submit', {
    titulo: form.titulo,
    inicioEm: paraIso(form.inicioEm),
    fimEm: paraIso(form.fimEm),
    local: form.local || undefined,
    tipo: form.tipo || undefined
  })
}
</script>

<template>
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
