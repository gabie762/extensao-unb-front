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
  <section class="feed">
    <div class="feed-header">
      <div>
        <h1>Projetos Recentes</h1>
        <p class="eyebrow">Acompanhe as atualizações dos projetos de extensão</p>
    </div>
      <button class="feed-action" type="button">Explorar mais</button>
    </div>

    <div class="project-list">
      <article v-for="project in projects" :key="project.id" class="project-card">
        <div class="card-top">
          <span class="area">{{ project.area }}</span>
          <span class="schedule">{{ project.schedule }}</span>
        </div>

        <h2>{{ project.title }}</h2>
        <p class="description">{{ project.description }}</p>

        <div class="tags">
          <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <div class="card-bottom">
          <span class="mentor">{{ project.mentor }} · {{ project.unidadeResponsavel }}</span>
          <button class="details-button" type="button">Ver projeto</button>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.feed {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.feed-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: #2563eb;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

h1 {
  margin: 0;
  color: #0f172a;
  font-size: 2rem;
}

.feed-action,
.details-button {
  border: 0;
  border-radius: 9999px;
  cursor: pointer;
  font-weight: 600;
}

.feed-action {
  background: #0f172a;
  color: #fff;
  padding: 0.8rem 1.1rem;
}

.project-list {
  display: grid;
  gap: 1rem;
}

.project-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
}

.card-top,
.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.area {
  display: inline-flex;
  background: #dbeafe;
  color: #1d4ed8;
  border-radius: 9999px;
  padding: 0.35rem 0.7rem;
  font-size: 0.875rem;
  font-weight: 700;
}

.schedule,
.mentor {
  color: #475569;
  font-size: 0.95rem;
}

h2 {
  margin: 1rem 0 0.5rem;
  color: #0f172a;
  font-size: 1.25rem;
}

.description {
  margin: 0;
  color: #475569;
  line-height: 1.6;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 1rem 0 1.25rem;
}

.tag {
  background: #f1f5f9;
  color: #334155;
  border-radius: 9999px;
  padding: 0.35rem 0.7rem;
  font-size: 0.85rem;
}

.details-button {
  background: #eff6ff;
  color: #1d4ed8;
  padding: 0.7rem 1rem;
}

@media (max-width: 768px) {
  .feed-header,
  .card-top,
  .card-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .feed-action,
  .details-button {
    width: 100%;
  }
}
</style>
