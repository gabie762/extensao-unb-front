<script setup lang="ts">
import type {
  OportunidadeFiltro,
  OportunidadeCertificadoFiltro,
  OportunidadePrazoFiltro,
  OpcaoFiltroOportunidade,
  OpcaoFiltroGenerica
} from '~/types/oportunidade'

defineProps<{
  searchTerm: string
  showFilters: boolean
  activeFilter: OportunidadeFiltro
  filterOptions: OpcaoFiltroOportunidade[]
  activeArea: string
  areaOptions: OpcaoFiltroGenerica<string>[]
  activeCertificado: OportunidadeCertificadoFiltro
  certificadoOptions: OpcaoFiltroGenerica<OportunidadeCertificadoFiltro>[]
  activePrazo: OportunidadePrazoFiltro
  prazoOptions: OpcaoFiltroGenerica<OportunidadePrazoFiltro>[]
}>()

const emit = defineEmits<{
  (e: 'update:searchTerm', value: string): void
  (e: 'toggleFilters'): void
  (e: 'update:activeFilter', value: OportunidadeFiltro): void
  (e: 'update:activeArea', value: string): void
  (e: 'update:activeCertificado', value: OportunidadeCertificadoFiltro): void
  (e: 'update:activePrazo', value: OportunidadePrazoFiltro): void
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

    <div v-if="showFilters" class="grid gap-4">
      <div class="grid gap-2">
        <p class="m-0 text-sm font-semibold text-slate-600 dark:text-slate-300">Tipo</p>
        <div class="flex flex-wrap gap-3">
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

      <div class="grid gap-2">
        <p class="m-0 text-sm font-semibold text-slate-600 dark:text-slate-300">Área</p>
        <div class="flex flex-wrap gap-3">
          <UButton
            v-for="option in areaOptions"
            :key="option.value"
            size="md"
            :variant="activeArea === option.value ? 'soft' : 'ghost'"
            :color="activeArea === option.value ? 'primary' : 'neutral'"
            class="rounded-full font-bold"
            @click="emit('update:activeArea', option.value)"
          >
            {{ option.label }}
          </UButton>
        </div>
      </div>

      <div class="grid gap-2">
        <p class="m-0 text-sm font-semibold text-slate-600 dark:text-slate-300">Certificado</p>
        <div class="flex flex-wrap gap-3">
          <UButton
            v-for="option in certificadoOptions"
            :key="option.value"
            size="md"
            :variant="activeCertificado === option.value ? 'soft' : 'ghost'"
            :color="activeCertificado === option.value ? 'primary' : 'neutral'"
            class="rounded-full font-bold"
            @click="emit('update:activeCertificado', option.value)"
          >
            {{ option.label }}
          </UButton>
        </div>
      </div>

      <div class="grid gap-2">
        <p class="m-0 text-sm font-semibold text-slate-600 dark:text-slate-300">Prazo de inscrição</p>
        <div class="flex flex-wrap gap-3">
          <UButton
            v-for="option in prazoOptions"
            :key="option.value"
            size="md"
            :variant="activePrazo === option.value ? 'soft' : 'ghost'"
            :color="activePrazo === option.value ? 'primary' : 'neutral'"
            class="rounded-full font-bold"
            @click="emit('update:activePrazo', option.value)"
          >
            {{ option.label }}
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
