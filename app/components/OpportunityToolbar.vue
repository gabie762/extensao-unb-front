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
  activeCertificado: OportunidadeCertificadoFiltro
  certificadoOptions: OpcaoFiltroGenerica<OportunidadeCertificadoFiltro>[]
  activePrazo: OportunidadePrazoFiltro
  prazoOptions: OpcaoFiltroGenerica<OportunidadePrazoFiltro>[]
  activeFiltersCount: number
  activeFiltersLabels: string[]
}>()

const emit = defineEmits<{
  (e: 'update:searchTerm', value: string): void
  (e: 'toggleFilters'): void
  (e: 'update:activeFilter', value: OportunidadeFiltro): void
  (e: 'update:activeCertificado', value: OportunidadeCertificadoFiltro): void
  (e: 'update:activePrazo', value: OportunidadePrazoFiltro): void
  (e: 'resetFilters'): void
}>()
</script>

<template>
  <div class="flex flex-col gap-3.5">
    <!-- Barra de busca e botão de filtros -->
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
      <div class="flex gap-3">
        <UButton
          color="neutral"
          variant="solid"
          size="xl"
          icon="i-heroicons-adjustments-horizontal"
          class="whitespace-nowrap relative"
          @click="emit('toggleFilters')"
        >
          Filtros
          <UBadge
            v-if="activeFiltersCount > 0"
            color="primary"
            variant="solid"
            class="absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
          >
            {{ activeFiltersCount }}
          </UBadge>
        </UButton>
      </div>
    </div>

    <!-- Tags dos filtros ativos + botão reset -->
    <div v-if="activeFiltersCount > 0" class="flex flex-wrap items-center gap-2">
      <UBadge
        v-for="(label, index) in activeFiltersLabels"
        :key="index"
        color="primary"
        variant="soft"
        class="font-medium px-3 py-1.5 text-sm"
      >
        {{ label }}
      </UBadge>
      <UButton
        color="neutral"
        variant="ghost"
        size="lg"
        icon="i-heroicons-x-mark"
        class="ml-auto"
        @click="emit('resetFilters')"
      >
        Limpar
      </UButton>
    </div>

    <!-- Overlay do drawer (clicável para fechar) -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      leave-active-class="transition-opacity duration-300 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showFilters"
        class="fixed inset-0 bg-black/50 z-40 md:hidden"
        @click="emit('toggleFilters')"
      />
    </Transition>

    <!-- Drawer lateral de filtros -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-300 ease-in"
      enter-from-class="translate-x-full"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="showFilters"
        class="fixed top-0 right-0 h-screen w-full md:w-96 bg-white dark:bg-slate-900 shadow-xl z-50 overflow-y-auto flex flex-col"
      >
        <!-- Header do drawer -->
        <div class="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">Filtros</h3>
          <UButton
            color="neutral"
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark"
            @click="emit('toggleFilters')"
          />
        </div>

        <!-- Conteúdo dos filtros -->
        <div class="flex-1 space-y-6 p-4">
          <!-- Tipo de oportunidade -->
          <div class="grid gap-3">
            <p class="m-0 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
              <UIcon name="i-heroicons-tag" class="w-5 h-5" />
              Tipo
            </p>
            <div class="flex flex-col gap-2">
              <UButton
                v-for="option in filterOptions"
                :key="option.value"
                size="sm"
                :variant="activeFilter === option.value ? 'soft' : 'ghost'"
                :color="activeFilter === option.value ? 'primary' : 'neutral'"
                class="w-full justify-start rounded-lg font-medium"
                @click="emit('update:activeFilter', option.value)"
              >
                {{ option.label }}
              </UButton>
            </div>
          </div>

          <UDivider />

          <!-- Certificado -->
          <div class="grid gap-3">
            <p class="m-0 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
              <UIcon name="i-heroicons-certificate" class="w-5 h-5" />
              Certificado
            </p>
            <div class="flex flex-col gap-2">
              <UButton
                v-for="option in certificadoOptions"
                :key="option.value"
                size="sm"
                :variant="activeCertificado === option.value ? 'soft' : 'ghost'"
                :color="activeCertificado === option.value ? 'primary' : 'neutral'"
                class="w-full justify-start rounded-lg font-medium"
                @click="emit('update:activeCertificado', option.value)"
              >
                {{ option.label }}
              </UButton>
            </div>
          </div>

          <UDivider />

          <!-- Prazo de inscrição -->
          <div class="grid gap-3">
            <p class="m-0 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
              <UIcon name="i-heroicons-calendar-days" class="w-5 h-5" />
              Prazo de inscrição
            </p>
            <div class="flex flex-col gap-2">
              <UButton
                v-for="option in prazoOptions"
                :key="option.value"
                size="sm"
                :variant="activePrazo === option.value ? 'soft' : 'ghost'"
                :color="activePrazo === option.value ? 'primary' : 'neutral'"
                class="w-full justify-start rounded-lg font-medium"
                @click="emit('update:activePrazo', option.value)"
              >
                {{ option.label }}
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>