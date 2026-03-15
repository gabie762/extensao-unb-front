<script setup lang="ts">
import { events, projects } from '~/data/home'
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_300px] gap-8 items-start">
    <div class="min-w-0">
      <ProjectFeed :projects="projects" />
    </div>

    <div class="w-full">
      <EventosProximos :events="events" />
    </div>
  </section>
</template>
