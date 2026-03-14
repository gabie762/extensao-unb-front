<script setup lang="ts">
import type { Oportunidade, OportunidadeCard } from '~/types/oportunidade'

defineProps<{
  opportunity: OportunidadeCard
  formatTipo: (tipo: Oportunidade['tipo']) => string
  formatPrazo: (date: string) => string
}>()
</script>

<template>
  <UCard class="flex flex-col h-full rounded-xl shadow-md border-slate-200 dark:border-slate-700">
    <!-- Header: Título e Prazo -->
    <template #header>
      <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div class="min-h-[4.5rem]">
          <p class="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1 line-clamp-1">{{ opportunity.projeto.titulo }}</p>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white leading-tight line-clamp-2">{{ opportunity.titulo }}</h2>
        </div>
        <UTooltip text="Prazo final para inscrições" placement="top">
          <UBadge color="neutral" variant="soft" class="whitespace-nowrap font-medium px-2 py-1">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4 mr-1" />
            Até {{ formatPrazo(opportunity.prazoInscricao) }}
          </UBadge>
        </UTooltip>
      </div>
    </template>

    <!-- Corpo: Descrição, Tags e Grade de Detalhes -->
    <div class="flex flex-col gap-4 flex-grow">
      <p class="text-slate-700 dark:text-slate-300 text-[15px] leading-relaxed line-clamp-3 min-h-[4.5rem]" :title="opportunity.descricao">
        {{ opportunity.descricao }}
      </p>

      <div class="flex flex-wrap gap-2 min-h-8">
        <UBadge
          :color="opportunity.tipo === 'bolsa' ? 'primary' : 'secondary'"
          variant="soft"
          class="font-bold capitalize px-3 py-1"
        >
          {{ formatTipo(opportunity.tipo) }}
        </UBadge>
        <UBadge color="success" variant="soft" class="font-bold px-3 py-1">
          inscrições abertas
        </UBadge>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg flex items-center gap-3 min-h-[4.75rem]">
          <UIcon name="i-heroicons-academic-cap" class="w-5 h-5 text-slate-400 dark:text-slate-500" />
          <div class="flex flex-col">
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 mb-0.5">Área</span>
            <span class="text-[14px] font-semibold text-slate-900 dark:text-slate-100 leading-tight line-clamp-1">{{ opportunity.projeto.area }}</span>
          </div>
        </div>

        <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg flex items-center gap-3 min-h-[4.75rem]">
          <UIcon name="i-heroicons-building-office" class="w-5 h-5 text-slate-400 dark:text-slate-500" />
          <div class="flex flex-col">
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 mb-0.5">Unidade responsável</span>
            <span class="text-[14px] font-semibold text-slate-900 dark:text-slate-100 leading-tight line-clamp-1">{{ opportunity.projeto.unidadeResponsavel }}</span>
          </div>
        </div>

        <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg flex items-center gap-3 min-h-[4.75rem]">
          <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-slate-400 dark:text-slate-500" />
          <div class="flex flex-col">
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 mb-0.5">Local</span>
            <span class="text-[14px] font-semibold text-slate-900 dark:text-slate-100 leading-tight line-clamp-1">{{ opportunity.local }}</span>
          </div>
        </div>

        <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg flex items-center gap-3 min-h-[4.75rem]">
          <UIcon name="i-heroicons-clock" class="w-5 h-5 text-slate-400 dark:text-slate-500" />
          <div class="flex flex-col">
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 mb-0.5">Carga horária</span>
            <span class="text-[14px] font-semibold text-slate-900 dark:text-slate-100 leading-tight line-clamp-1">{{ opportunity.cargaHoraria }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Rodapé: Coordenação e Botão -->
    <template #footer>
      <div class="flex items-center justify-center mt-auto pt-2">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
          class="w-full min-h-14 text-base font-bold shadow-md hover:-translate-y-0.5 transition-transform justify-center"
          icon="i-heroicons-paper-airplane"
          trailing
        >
          Saiba Mais!
        </UButton>
      </div>
    </template>
  </UCard>
</template>