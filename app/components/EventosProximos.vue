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
  <aside class="events-card">
    <div class="header">
      <p class="eyebrow">Agenda</p>
      <h2>Eventos próximos</h2>
    </div>

    <div class="events-list">
      <article v-for="event in events" :key="event.id" class="event-item">
        <div class="event-content">
          <h3>{{ event.title }}</h3>
          <p>{{ event.date }} - {{ event.time }}</p>
          <p>{{ event.location }}</p>

        </div>
      </article>
    </div>
  </aside>
</template>

<style scoped>
.events-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
  position: sticky;
  top: 1.5rem;
}

.header {
  margin-bottom: 1rem;
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: #7c3aed;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

h2,
h3 {
  margin: 0;
  color: #0f172a;
}

.events-list {
  display: grid;
  gap: 0.9rem;
}

.event-item {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  padding: 0.9rem;
  border-radius: 0.9rem;
  background: #f8fafc;
}

.date-badge {
  min-width: 78px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: #ede9fe;
  color: #5b21b6;
  padding: 0.75rem;
  border-radius: 0.8rem;
  font-weight: 700;
}

.date,
.time {
  font-size: 0.85rem;
}

.event-content {
  display: grid;
  gap: 0.35rem;
}

.event-content p {
  margin: 0;
  color: #475569;
}
</style>
