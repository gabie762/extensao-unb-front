<script setup lang="ts">
const route = useRoute()

const {
    filterOptions,
    areaOptions,
    certificadoOptions,
    prazoOptions,
    searchTerm,
    showFilters,
    activeFilter,
    activeArea,
    activeCertificado,
    activePrazo,
    filteredOpportunities,
    formatTipo,
    formatPrazo,
    activeFiltersCount,
    activeFiltersLabels,
    resetAllFilters
} = useOportunidades()

const isDetailRoute = computed(() => Boolean(route.params.id))
</script>

<template>
    <NuxtPage v-if="isDetailRoute" />

    <section v-else class="flex flex-col gap-6">
        <header class="grid gap-3">
            <p class="m-0 text-blue-600 text-sm font-bold tracking-wider uppercase">Oportunidades</p>
             <h1 class="m-0 text-slate-900 dark:text-white text-[clamp(2.5rem,3vw,3rem)] font-bold tracking-tight">Encontre bolsas e oportunidades de voluntariado</h1>
            <p class="max-w-[760px] m-0 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                Pesquise vagas abertas, filtre por tipo de participação e encontre projetos alinhados ao seu perfil.
            </p>
        </header>

        <OpportunityToolbar
            :search-term="searchTerm"
            :show-filters="showFilters"
            :active-filter="activeFilter"
            :filter-options="filterOptions"
            :active-area="activeArea"
            :area-options="areaOptions"
            :active-certificado="activeCertificado"
            :certificado-options="certificadoOptions"
            :active-prazo="activePrazo"
            :prazo-options="prazoOptions"
            :active-filters-count="activeFiltersCount"
            :active-filters-labels="activeFiltersLabels"
            @update:search-term="searchTerm = $event"
            @toggle-filters="showFilters = !showFilters"
            @update:active-filter="activeFilter = $event"
            @update:active-area="activeArea = $event"
            @update:active-certificado="activeCertificado = $event"
            @update:active-prazo="activePrazo = $event"
            @reset-filters="resetAllFilters"
        />

        <div class="text-slate-600 dark:text-slate-300 text-[0.95rem] font-semibold">
            <span>{{ filteredOpportunities.length }} oportunidades abertas</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            <OpportunityCard
                v-for="opportunity in filteredOpportunities"
                :key="opportunity.id"
                :opportunity="opportunity"
                :format-tipo="formatTipo"
                :format-prazo="formatPrazo"
                class="h-full"

            />
        </div>
    </section>
</template>