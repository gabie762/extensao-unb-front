<script setup lang="ts">
import type { AreaConhecimento } from '~/types/projeto'

defineProps<{
  projects: Array<{
    id: number
    title: string
    area: AreaConhecimento
    unidadeResponsavel: string
    description: string
    mentor: string
    schedule: string
    tags: string[]
  }>
}>()
</script>

<template>
  <section class="flex flex-col gap-5">
    <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
      <div>
        <p class="m-0 text-blue-600 text-sm font-bold tracking-widest uppercase mb-1">Feed</p>
        <h1 class="m-0 text-slate-900 dark:text-white text-3xl font-bold">Projetos Recentes</h1>
        <p class="m-0 text-slate-500 dark:text-slate-400 text-sm mt-1">Acompanhe as atualizações dos projetos de extensão</p>
      </div>
      <UButton color="neutral" variant="solid" size="md" class="whitespace-nowrap shrink-0">
        Explorar mais
      </UButton>
    </div>

    <div class="grid gap-4">
      <UCard
        v-for="project in projects"
        :key="project.id"
        class="rounded-xl"
      >
        <template #header>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <UBadge color="primary" variant="soft" class="w-fit font-bold">
              {{ project.area }}
            </UBadge>
            <span class="text-slate-500 dark:text-slate-400 text-sm">{{ project.schedule }}</span>
          </div>
        </template>

        <div class="flex flex-col gap-3">
          <h2 class="m-0 text-slate-900 dark:text-white text-[1.2rem] font-bold leading-snug">{{ project.title }}</h2>
          <p class="m-0 text-slate-600 dark:text-slate-300 leading-relaxed">{{ project.description }}</p>
          <div class="flex flex-wrap gap-2 mt-1">
            <UBadge
              v-for="tag in project.tags"
              :key="tag"
              color="neutral"
              variant="soft"
              class="font-medium"
            >
              {{ tag }}
            </UBadge>
          </div>
        </div>

        <template #footer>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span class="text-slate-500 dark:text-slate-400 text-sm">
              {{ project.mentor }} · {{ project.unidadeResponsavel }}
            </span>
            <UButton color="primary" variant="soft" size="md" class="font-bold whitespace-nowrap w-full sm:w-auto">
              Ver projeto
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </section>
</template>
