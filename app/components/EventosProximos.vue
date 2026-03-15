<script setup lang="ts">
defineProps<{
  events: Array<{
    id: number
    title: string
    date: string
    time: string
    location: string
  }>
}>()
</script>

<template>
  <UCard class="sticky top-6">
    <template #header>
      <p class="m-0 text-violet-600 text-sm font-bold tracking-widest uppercase mb-1">Agenda</p>
      <h2 class="m-0 text-slate-900 dark:text-white text-xl font-bold">Eventos próximos</h2>
    </template>

    <div class="grid gap-3.5">
      <div
        v-for="event in events"
        :key="event.id"
        class="flex gap-3.5 items-start p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800"
      >
        <div class="grid gap-1">
          <h3 class="m-0 text-slate-900 dark:text-white font-semibold text-sm leading-snug">{{ event.title }}</h3>
          <p class="m-0 text-slate-500 dark:text-slate-400 text-sm">{{ event.date }} · {{ event.time }}</p>
          <p class="m-0 text-slate-500 dark:text-slate-400 text-sm">{{ event.location }}</p>
        </div>
      </div>
    </div>
  </UCard>
</template>
