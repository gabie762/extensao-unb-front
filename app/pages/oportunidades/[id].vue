<script setup lang="ts">
const route = useRoute()

const { opportunities } = useOportunidades()

const opportunity = computed(() => opportunities.find((item) => item.id === String(route.params.id)))

const statusLabelMap = {
  aberto: 'Aberto',
  em_andamento: 'Em andamento',
  encerrado: 'Encerrado'
} as const

const vagasLabel = computed(() => {
  if (!opportunity.value) {
    return 'Indisponível'
  }

  if (opportunity.value.projeto.status === 'encerrado' || opportunity.value.projeto.vagas <= 0) {
    return 'Fechadas'
  }

  if (opportunity.value.projeto.status === 'aberto') {
    return 'Abertas'
  }

  return 'Outro'
})
</script>

<template>
  <section v-if="opportunity" class="flex flex-col gap-6">
    <!-- Header -->
    <header class="grid gap-4">
      <NuxtLink to="/oportunidades" class="text-sm font-semibold text-primary hover:underline w-fit">
        ← Voltar para oportunidades
      </NuxtLink>

      <div class="grid gap-2">
        <p class="m-0 text-blue-600 text-sm font-bold tracking-wider uppercase">Detalhes da ação</p>
        <h1 class="m-0 text-slate-900 dark:text-white text-[clamp(2rem,3vw,2.5rem)] font-bold tracking-tight">
          {{ opportunity.titulo }}
        </h1>
      </div>

      <div class="flex flex-wrap gap-2">
        <UBadge color="neutral" variant="soft" class="font-semibold px-3 py-1">
          {{ opportunity.projeto.unidadeResponsavel }}
        </UBadge>
        <UBadge color="neutral" variant="soft" class="font-semibold px-3 py-1">
          {{ opportunity.local }}
        </UBadge>
        <UBadge
          v-for="tag in opportunity.projeto.tags"
          :key="tag"
          color="primary"
          variant="soft"
          class="font-semibold px-3 py-1"
        >
          {{ tag }}
        </UBadge>
      </div>
    </header>

    <!-- Body: two-column on md+ -->
    <div class="grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_360px] gap-6 items-start">

      <!-- Left: main content wrapped in a surface panel -->
      <div class="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 md:p-6 flex flex-col gap-5 border border-slate-200 dark:border-slate-700">

        <!-- Meta strip -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="bg-white dark:bg-slate-800 p-3 rounded-xl flex items-center gap-3 border border-slate-200 dark:border-slate-700">
            <UIcon name="i-heroicons-academic-cap" class="w-5 h-5 text-slate-400 shrink-0" />
            <div class="min-w-0">
              <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Área</p>
              <p class="text-[13px] font-semibold text-slate-900 dark:text-slate-100 m-0 truncate">{{ opportunity.projeto.area }}</p>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 p-3 rounded-xl flex items-center gap-3 border border-slate-200 dark:border-slate-700">
            <UIcon name="i-heroicons-tag" class="w-5 h-5 text-slate-400 shrink-0" />
            <div class="min-w-0">
              <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Tipo</p>
              <p class="text-[13px] font-semibold text-slate-900 dark:text-slate-100 m-0 capitalize">{{ opportunity.tipo }}</p>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 p-3 rounded-xl flex items-center gap-3 border border-slate-200 dark:border-slate-700">
            <UIcon name="i-heroicons-clock" class="w-5 h-5 text-slate-400 shrink-0" />
            <div class="min-w-0">
              <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Carga horária</p>
              <p class="text-[13px] font-semibold text-slate-900 dark:text-slate-100 m-0">{{ opportunity.cargaHoraria }}</p>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 p-3 rounded-xl flex items-center gap-3 border border-slate-200 dark:border-slate-700">
            <UIcon name="i-heroicons-calendar" class="w-5 h-5 text-slate-400 shrink-0" />
            <div class="min-w-0">
              <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Prazo</p>
              <p class="text-[13px] font-semibold text-slate-900 dark:text-slate-100 m-0">{{ new Intl.DateTimeFormat('pt-BR').format(new Date(opportunity.prazoInscricao + 'T00:00:00')) }}</p>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="border-t border-slate-200 dark:border-slate-700 pt-5">
          <h2 class="text-base font-bold text-slate-900 dark:text-white mb-2">Descrição</h2>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed m-0 text-[15px]">{{ opportunity.descricao }}</p>
        </div>

        <!-- Sobre o Projeto -->
        <div class="border-t border-slate-200 dark:border-slate-700 pt-5">
          <h2 class="text-base font-bold text-slate-900 dark:text-white mb-2">Sobre o Projeto</h2>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed m-0 text-[15px]">{{ opportunity.sobreProjeto }}</p>
        </div>

        <div class="border-t border-slate-200 dark:border-slate-700 pt-5">
          <h2 class="text-base font-bold text-slate-900 dark:text-white mb-3">Objetivos</h2>
          <ul class="m-0 pl-5 grid gap-2 text-[15px] text-slate-700 dark:text-slate-300">
            <li v-for="item in opportunity.objetivos" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="border-t border-slate-200 dark:border-slate-700 pt-5">
          <h2 class="text-base font-bold text-slate-900 dark:text-white mb-3">Atividades Desenvolvidas</h2>
          <ul class="m-0 pl-5 grid gap-2 text-[15px] text-slate-700 dark:text-slate-300">
            <li v-for="item in opportunity.atividadesDesenvolvidas" :key="item">{{ item }}</li>
          </ul>
        </div>

        <!-- Requisitos -->
        <div class="border-t border-slate-200 dark:border-slate-700 pt-5">
          <h2 class="text-base font-bold text-slate-900 dark:text-white mb-3">Requisitos</h2>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="req in opportunity.requisitos"
              :key="req"
              color="neutral"
              variant="soft"
              class="font-medium px-3 py-1 text-[13px]"
            >
              {{ req }}
            </UBadge>
          </div>
        </div>
      </div>

      <!-- Right: sidebar cards -->
      <div class="flex flex-col gap-4">

        <!-- Informações -->
        <UCard>
          <template #header>
            <h2 class="text-base font-bold text-slate-900 dark:text-white">Informações</h2>
          </template>

          <div class="grid grid-cols-2 gap-2">
            <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg col-span-2 sm:col-span-1 md:col-span-2">
              <p class="text-xs font-bold text-slate-500 dark:text-slate-400 m-0">Status</p>
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 m-0 mt-1">
                {{ statusLabelMap[opportunity.projeto.status] }}
              </p>
            </div>

            <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg col-span-2 sm:col-span-1 md:col-span-2">
              <p class="text-xs font-bold text-slate-500 dark:text-slate-400 m-0">Vagas</p>
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 m-0 mt-1">
                {{ vagasLabel }} ({{ opportunity.projeto.vagas }})
              </p>
            </div>

            <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg col-span-2 sm:col-span-1 md:col-span-2">
              <p class="text-xs font-bold text-slate-500 dark:text-slate-400 m-0">Carga horária</p>
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 m-0 mt-1">{{ opportunity.cargaHoraria }}</p>
            </div>

            <div class="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg col-span-2 sm:col-span-1 md:col-span-2">
              <p class="text-xs font-bold text-slate-500 dark:text-slate-400 m-0">Certificado</p>
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 m-0 mt-1">
                {{ opportunity.certificado ? 'Sim' : 'Não' }}
              </p>
            </div>
          </div>
        </UCard>

        <!-- Como participar + Coordenação -->
        <UCard>
          <template #header>
            <h2 class="text-base font-bold text-slate-900 dark:text-white">Como participar</h2>
          </template>

          <ul class="m-0 pl-5 grid gap-2 text-[15px] text-slate-700 dark:text-slate-300">
            <li v-for="item in opportunity.comoParticipar" :key="item">{{ item }}</li>
          </ul>

          <div class="mt-5 border-t border-slate-200 dark:border-slate-700 pt-4 grid gap-0.5">
            <p class="text-xs font-bold text-slate-500 dark:text-slate-400 m-0 mb-1">Coordenação</p>
            <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 m-0">{{ opportunity.projeto.professor.nome }}</p>
            <p class="text-sm text-slate-600 dark:text-slate-300 m-0">{{ opportunity.projeto.professor.departamento }}</p>
            <a
              :href="`mailto:${opportunity.projeto.professor.email}`"
              class="text-sm text-primary hover:underline m-0 w-fit"
            >{{ opportunity.projeto.professor.email }}</a>
          </div>
        </UCard>

      </div>
    </div>
  </section>

  <section v-else class="grid gap-4">
    <h1 class="m-0 text-2xl font-bold text-slate-900 dark:text-white">Oportunidade não encontrada</h1>
    <p class="m-0 text-slate-600 dark:text-slate-300">Não foi possível localizar os detalhes desta oportunidade.</p>
    <div>
      <UButton to="/oportunidades" color="primary" variant="solid">
        Voltar para oportunidades
      </UButton>
    </div>
  </section>
</template>
