<script setup lang="ts">
import type { OportunidadeFiltro, OpcaoFiltroOportunidade } from '~/types/oportunidade'

defineProps<{
  searchTerm: string
  showFilters: boolean
  activeFilter: OportunidadeFiltro
  filterOptions: OpcaoFiltroOportunidade[]
}>()

const emit = defineEmits<{
  (e: 'update:searchTerm', value: string): void
  (e: 'toggleFilters'): void
  (e: 'update:activeFilter', value: OportunidadeFiltro): void
}>()
</script>

<template>
  <div class="flex flex-col gap-3.5">
    <div class="flex flex-col md:flex-row gap-3">
      <UInput
        :model-value="searchTerm"
        type="search"
        placeholder="Buscar por título, área ou requisito"
        icon="i-heroicons-magnifying-glass"
        size="xl"
        class="flex-1"
        @update:model-value="emit('update:searchTerm', String($event))"
      />
      <UButton
        color="neutral"
        variant="solid"
        size="xl"
        icon="i-heroicons-adjustments-horizontal"
        class="whitespace-nowrap"
        @click="emit('toggleFilters')"
      >
        Filtros
      </UButton>
    </div>

    <div v-if="showFilters" class="flex flex-wrap gap-3">
      <UButton
        v-for="option in filterOptions"
        :key="option.value"
        size="md"
        :variant="activeFilter === option.value ? 'soft' : 'ghost'"
        :color="activeFilter === option.value ? 'primary' : 'neutral'"
        class="rounded-full font-bold"
        @click="emit('update:activeFilter', option.value)"
      >
        {{ option.label }}
      </UButton>
    </div>
  </div>
</template>
