<script setup lang="ts">
import type { Evento } from '~/types/evento';
import type { Projeto } from '~/types/projeto';

const api = useApi()

const { data: projects, pending: loadingProjects } = await useAsyncData<Projeto[]>(
  'home-projects',
  () => api<Projeto[]>('/projetos'),
)
const { data: events, pending: loadingEvents } = await useAsyncData<Evento[]>(
  'home-events',
  () => api<Evento[]>('/eventos'),
)
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_300px] gap-8 items-start">
    <div class="min-w-0">
      <div v-if="loadingProjects" class="flex justify-center p-12">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary" />
      </div>
      <ProjectFeed v-else :projects="projects || []" />
    </div>

    <div class="w-full">
      <div v-if="loadingEvents" class="flex justify-center p-12">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary" />
      </div>
      <EventosProximos v-else :events="events || []" />
    </div>
  </section>
</template>
