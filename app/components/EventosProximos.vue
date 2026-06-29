<script setup lang="ts">
import type { Evento } from '~/types/evento';

defineProps<{
  events: Evento[]
}>()

function formatarDataHora(valor: string) {
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
</script>

<template>
  <UCard class="sticky top-6">
    <template #header>
      <p class="m-0 text-violet-600 text-sm font-bold tracking-widest uppercase mb-1">Agenda</p>
      <h2 class="m-0 text-slate-900 dark:text-white text-xl font-bold">Eventos próximos</h2>
    </template>

    <div class="grid gap-3.5">
      <div
        v-for="event in events"
        :key="event.id"
        class="flex gap-3.5 items-start p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800"
      >
        <div class="grid gap-1">
          <h3 class="m-0 text-slate-900 dark:text-white font-semibold text-sm leading-snug">{{ event.titulo }}</h3>
          <p class="m-0 text-slate-500 dark:text-slate-400 text-sm">{{ formatarDataHora(event.inicioEm) }}</p>
          <p class="m-0 text-slate-500 dark:text-slate-400 text-sm">{{ event.local }}</p>
        </div>
      </div>
    </div>
  </UCard>
</template>
