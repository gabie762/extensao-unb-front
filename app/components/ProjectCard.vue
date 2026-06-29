<script setup lang="ts">
import type { Projeto } from '~/types/projeto'

defineProps<{
  projeto: Projeto
}>()

const statusConfig = {
  aberto: { label: 'Aberto', color: 'success' as const },
  em_andamento: { label: 'Em andamento', color: 'primary' as const },
  encerrado: { label: 'Encerrado', color: 'neutral' as const }
}
</script>

<template>
  <UCard class="flex flex-col h-full rounded-xl shadow-md border-slate-200 dark:border-slate-700">
    <template #header>
      <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div class="min-h-[4.5rem]">
          <UBadge color="primary" variant="soft" class="mb-2 font-medium text-xs">
            {{ projeto.area }}
          </UBadge>
          <h2 class="m-0 text-slate-900 dark:text-white text-[1.1rem] font-bold leading-snug line-clamp-2">
            {{ projeto.titulo }}
          </h2>
        </div>
        <UBadge
          :color="statusConfig[projeto.status].color"
          variant="soft"
          class="whitespace-nowrap font-bold shrink-0"
        >
          {{ statusConfig[projeto.status].label }}
        </UBadge>
      </div>
    </template>

    <div class="flex flex-col gap-4 flex-grow">
      <p class="m-0 text-slate-600 dark:text-slate-300 text-[14px] leading-relaxed line-clamp-3 min-h-[4.25rem]">
        {{ projeto.resumo || projeto.descricao || 'Sem descrição disponível.' }}
      </p>

      <div class="grid grid-cols-1 gap-2.5">
        <div class="bg-slate-50 dark:bg-slate-800 px-3 py-2.5 rounded-lg flex items-center gap-3">
          <UIcon name="i-heroicons-user" class="w-4 h-4 text-slate-400 shrink-0" />
          <div class="min-w-0">
            <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Coordenador</p>
            <p class="text-[13px] font-semibold text-slate-900 dark:text-slate-100 m-0 truncate">
              {{ projeto.coordenador?.nome || 'N/A' }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2.5">
          <div class="bg-slate-50 dark:bg-slate-800 px-3 py-2.5 rounded-lg flex items-center gap-3">
            <UIcon name="i-heroicons-users" class="w-4 h-4 text-slate-400 shrink-0" />
            <div class="min-w-0">
              <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Vagas</p>
              <p class="text-[13px] font-semibold text-slate-900 dark:text-slate-100 m-0">{{ projeto.vagas }}</p>
            </div>
          </div>

          <div class="bg-slate-50 dark:bg-slate-800 px-3 py-2.5 rounded-lg flex items-center gap-3">
            <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 text-slate-400 shrink-0" />
            <div class="min-w-0">
              <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Período</p>
              <p class="text-[13px] font-semibold text-slate-900 dark:text-slate-100 m-0 truncate">{{ projeto.cronograma }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="projeto.tags?.length" class="flex flex-wrap gap-1.5">
        <UBadge
          v-for="tag in projeto.tags"
          :key="tag"
          color="neutral"
          variant="soft"
          class="text-xs font-medium"
        >
          {{ tag }}
        </UBadge>
      </div>
    </div>

    <template #footer>
      <UButton
        :to="`/projetos/${projeto.id}`"
        color="primary"
        variant="solid"
        size="lg"
        class="w-full min-h-14 text-base font-bold shadow-md hover:-translate-y-0.5 transition-transform justify-center"
        icon="i-heroicons-arrow-right"
        trailing
      >
        Ver Detalhes
      </UButton>
    </template>
  </UCard>
</template>
