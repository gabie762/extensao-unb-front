<script setup lang="ts">
import type { Projeto } from '~/types/projeto'

defineProps<{
  projects: Projeto[]
}>()

function formatarCronograma(valor: string) {
  if (!valor) return ''
  const date = new Date(valor)
  if (isNaN(date.getTime())) return valor
  const temHorario = valor.includes('T') && !valor.endsWith('T00:00:00') && !valor.endsWith('T00:00:00Z')
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...(temHorario && { hour: '2-digit', minute: '2-digit' })
  }).format(date)
}
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
        class="rounded-xl h-full flex flex-col"
      >
        <template #header>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <UBadge color="primary" variant="soft" class="w-fit font-bold">
              {{ project.area }}
            </UBadge>
            <span class="text-slate-500 dark:text-slate-400 text-sm">{{ formatarCronograma(project.cronograma) }}</span>
          </div>
        </template>

        <div class="flex flex-col gap-3 flex-1">
          <h2 class="m-0 text-slate-900 dark:text-white text-[1.2rem] font-bold leading-snug line-clamp-2 min-h-[3.25rem]">{{ project.titulo }}</h2>
          <p class="m-0 text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 min-h-[4.5rem]">{{ project.descricao || project.resumo }}</p>
        </div>

        <template #footer>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <span class="text-slate-500 dark:text-slate-400 text-sm">
              {{ project.coordenador?.nome }} · {{ project.unidadeResponsavel }}
            </span>
            <UButton
              :to="`/projetos/${project.id}?from=feed`"
              color="primary"
              variant="soft"
              size="md"
              class="font-bold whitespace-nowrap w-full sm:w-auto"
            >
              Ver projeto
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </section>
</template>
