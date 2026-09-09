<script setup lang="ts">
const route = useRoute()
const { user } = useAuth()
const { pending, error, searchTerm, filteredProjects } = useProjetos()

const isDetailRoute = computed(() => route.path !== '/projetos')
const podeCadastrar = computed(() => ['ROLE_PROFESSOR', 'ROLE_ADMIN'].includes(user.value?.role || ''))
</script>

<template>
  <NuxtPage v-if="isDetailRoute" />

  <section v-else class="flex flex-col gap-6">
    <header class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div class="grid gap-3">
        <p class="m-0 text-blue-600 text-sm font-bold tracking-wider uppercase">Projetos</p>
        <h1 class="m-0 text-slate-900 dark:text-white text-[clamp(2.5rem,3vw,3rem)] font-bold tracking-tight">
          Projetos de Extensão
        </h1>
        <p class="max-w-[760px] m-0 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
          Conheça os projetos de extensão do departamento, suas atividades e oportunidades de participação.
        </p>
      </div>

      <UButton
        v-if="podeCadastrar"
        to="/projetos/novo"
        color="primary"
        variant="solid"
        size="xl"
        icon="i-heroicons-plus"
        class="font-bold shrink-0"
      >
        Nova ação
      </UButton>
    </header>

    <UInput
      v-model="searchTerm"
      type="search"
      placeholder="Buscar por título, coordenador ou área"
      icon="i-heroicons-magnifying-glass"
      size="xl"
      class="w-full"
    />

    <div v-if="pending" class="flex justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary" />
    </div>

    <div v-else-if="error" class="bg-red-50 p-4 rounded-md text-red-700 text-center">
      Erro ao carregar projetos. Por favor, tente novamente mais tarde.
    </div>

    <template v-else>
      <div class="text-slate-600 dark:text-slate-300 text-[0.95rem] font-semibold">
        {{ filteredProjects.length }} {{ filteredProjects.length === 1 ? 'projeto encontrado' : 'projetos encontrados' }}
      </div>

      <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        <ProjectCard
          v-for="projeto in filteredProjects"
          :key="projeto.id"
          :projeto="projeto"
          class="h-full"
        />
      </div>

      <div v-else class="flex flex-col items-center gap-4 py-16 text-center">
        <UIcon name="i-heroicons-magnifying-glass" class="w-12 h-12 text-slate-300 dark:text-slate-600" />
        <p class="m-0 text-slate-500 dark:text-slate-400 text-lg font-medium">
          Nenhum projeto encontrado para "<span class="font-bold">{{ searchTerm }}</span>"
        </p>
        <UButton color="neutral" variant="ghost" @click="searchTerm = ''">
          Limpar busca
        </UButton>
      </div>
    </template>
  </section>
</template>

