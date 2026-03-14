<script setup lang="ts">
import type { Oportunidade, OportunidadeCard } from '~/types/oportunidade'

defineProps<{
  opportunity: OportunidadeCard
  formatTipo: (tipo: Oportunidade['tipo']) => string
  formatPrazo: (date: string) => string
}>()
</script>

<template>
  <UCard class="flex flex-col h-full rounded-xl shadow-md border-slate-200">
    <!-- Header: Título e Prazo -->
    <template #header>
      <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <p class="text-sm font-semibold text-slate-500 mb-1">{{ opportunity.projeto.titulo }}</p>
          <h2 class="text-lg font-bold text-slate-900 leading-tight">{{ opportunity.titulo }}</h2>
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
      <p class="text-slate-700 text-[15px] leading-relaxed line-clamp-3" :title="opportunity.descricao">
        {{ opportunity.descricao }}
      </p>

      <div class="flex flex-wrap gap-2">
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
        <div class="bg-slate-50 p-3 rounded-lg flex items-center gap-3">
          <UIcon name="i-heroicons-academic-cap" class="w-5 h-5 text-slate-400" />
          <div class="flex flex-col">
            <span class="text-xs font-bold text-slate-500 mb-0.5">Área</span>
            <span class="text-[14px] font-semibold text-slate-900 leading-tight">{{ opportunity.projeto.area }}</span>
          </div>
        </div>

        <div class="bg-slate-50 p-3 rounded-lg flex items-center gap-3">
          <UIcon name="i-heroicons-building-office" class="w-5 h-5 text-slate-400" />
          <div class="flex flex-col">
            <span class="text-xs font-bold text-slate-500 mb-0.5">Unidade responsável</span>
            <span class="text-[14px] font-semibold text-slate-900 leading-tight">{{ opportunity.projeto.unidadeResponsavel }}</span>
          </div>
        </div>

        <div class="bg-slate-50 p-3 rounded-lg flex items-center gap-3">
          <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-slate-400" />
          <div class="flex flex-col">
            <span class="text-xs font-bold text-slate-500 mb-0.5">Local</span>
            <span class="text-[14px] font-semibold text-slate-900 leading-tight">{{ opportunity.local }}</span>
          </div>
        </div>

        <div class="bg-slate-50 p-3 rounded-lg flex items-center gap-3">
          <UIcon name="i-heroicons-clock" class="w-5 h-5 text-slate-400" />
          <div class="flex flex-col">
            <span class="text-xs font-bold text-slate-500 mb-0.5">Carga horária</span>
            <span class="text-[14px] font-semibold text-slate-900 leading-tight">{{ opportunity.cargaHoraria }}</span>
          </div>
        </div>
      </div>

      <!-- Requisitos (se existirem, opcional mostrar todos para não poluir) -->
      <div v-if="opportunity.requisitos?.length" class="mt-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
        <div class="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
           <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-emerald-600" /> Requisitos básicos
        </div>
        <ul class="list-disc pl-5 space-y-0.5">
          <li v-for="req in opportunity.requisitos.slice(0, 3)" :key="req">{{ req }}</li>
          <li v-if="opportunity.requisitos.length > 3" class="text-slate-400 list-none -ml-4 mt-1">+ {{ opportunity.requisitos.length - 3 }} requisitos</li>
        </ul>
      </div>
    </div>

    <!-- Rodapé: Coordenação e Botão -->
    <template #footer>
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-auto">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
          class="w-full md:w-auto font-bold shadow-md hover:-translate-y-0.5 transition-transform"
          icon="i-heroicons-paper-airplane"
          trailing
        >
          Saiba Mais!
        </UButton>
      </div>
    </template>
  </UCard>
</template>