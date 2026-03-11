<script setup lang="ts">
const projects = [
  {
    id: 1,
    title: 'Plataforma de monitoria com IA para disciplinas iniciais',
    area: 'Educação',
    description:
      'Projeto para apoiar estudantes em Cálculo e Programação com trilhas de estudo, revisão automática e acompanhamento de progresso.',
    mentor: 'Prof. Ana Paula',
    schedule: 'Inscrições até 18/03',
    tags: ['IA', 'Ensino', 'Web App']
  },
  {
    id: 2,
    title: 'Mapa de oportunidades acadêmicas e extensão universitária',
    area: 'Comunidade',
    description:
      'Centraliza bolsas, extensão, eventos e iniciativas estudantis para facilitar o acesso dos alunos a projetos ativos no campus.',
    mentor: 'PET Computação',
    schedule: 'Encontro quinta, 14h',
    tags: ['Extensão', 'Dados', 'Impacto social']
  },
  {
    id: 3,
    title: 'Laboratório de UX para serviços digitais da universidade',
    area: 'Design & Produto',
    description:
      'Grupo multidisciplinar focado em melhorar sistemas internos da universidade com pesquisa com usuários, prototipação e validação.',
    mentor: 'Lab de Inovação',
    schedule: 'Vagas abertas',
    tags: ['UX', 'Pesquisa', 'Protótipos']
  }
]

const events = [
  {
    id: 1,
    title: 'Workshop de iniciação científica',
    date: '12 Mar',
    time: '10:00',
    location: 'Auditório da Faculdade'
  },
  {
    id: 2,
    title: 'Plantão de projetos de extensão',
    date: '14 Mar',
    time: '15:30',
    location: 'Sala 204 - Bloco B'
  },
  {
    id: 3,
    title: 'Feira de grupos estudantis',
    date: '18 Mar',
    time: '09:00',
    location: 'Praça Central do Campus'
  }
]
</script>

<template>
  <section class="home-grid">
    <div class="feed-column">
      <ProjectFeed :projects="projects" />
    </div>

    <div class="events-column">
      <EventosProximos :events="events" />
    </div>
  </section>
</template>

<style scoped>
.home-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 2rem;
  align-items: start;
}

.feed-column {
  min-width: 0;
  grid-column: 1;
}

.events-column {
  grid-column: 2;
  width: 100%;
}

.events-column :deep(.events-card) {
  width: 100%;
}

@media (max-width: 768px) {
  .home-grid {
    grid-template-columns: 1fr;
  }

  .feed-column,
  .events-column {
    grid-column: auto;
  }
}
</style>
