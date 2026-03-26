<script setup lang="ts">
import { opportunities } from '~/data/oportunidades'

const usuario = {
  id: 'student-1',
  nome: 'Gabriela Não Sei Das Quantas',
  email: 'gabriela.naoseidasquantas@aluno.unb.br',
  role: 'aluno' as const,
  departamento: 'Ciência da Computação',
  semestre: '6º semestre',
  interesses: ['Extensão', 'Dados', 'Educação'],
  bio: 'Estudante de Ciência da Computação interessada em projetos de impacto social, análise de dados e desenvolvimento de produtos digitais para a comunidade acadêmica.'
}

const inscricoesAtivas = opportunities.slice(0, 2)
const oportunidadesSalvas = opportunities.slice(2, 4)

const stats = computed(() => {
  const totalAtivas = inscricoesAtivas.length
  const totalSalvas = oportunidadesSalvas.length
  const totalCertificados = inscricoesAtivas.filter((item) => item.certificado).length + oportunidadesSalvas.filter((item) => item.certificado).length

  return {
    totalAtivas,
    totalSalvas,
    totalCertificados
  }
})

const formatTipo = (tipo: 'bolsa' | 'voluntariado') => {
  if (tipo === 'bolsa') return 'Bolsa'
  return 'Voluntariado'
}

const formatPrazo = (date: string) => {
  const parsedDate = new Date(date)
  return parsedDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>

<template>
  <section class="flex flex-col gap-6">
    <header class="grid gap-3">
      <p class="m-0 text-blue-600 text-sm font-bold tracking-wider uppercase">Perfil</p>
      <h1 class="m-0 text-slate-900 dark:text-white text-[clamp(2.2rem,3vw,2.8rem)] font-bold tracking-tight">
        Sua área de usuário
      </h1>
      <p class="max-w-[760px] m-0 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
        Acompanhe suas inscrições, oportunidades salvas e informações do seu perfil acadêmico.
      </p>
    </header>

    <div class="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
      <div class="grid gap-6">
        <UCard class="rounded-xl">
          <div class="flex flex-col md:flex-row md:items-start gap-5">
            <UAvatar src="/images/default-avatar.svg" :alt="usuario.nome" class="w-20 h-20 shrink-0" />

            <div class="grid gap-3 min-w-0">
              <div class="grid gap-1">
                <h2 class="m-0 text-slate-900 dark:text-white text-2xl font-bold leading-tight">{{ usuario.nome }}</h2>
                <p class="m-0 text-slate-600 dark:text-slate-300 text-sm">{{ usuario.email }}</p>
                <p class="m-0 text-slate-500 dark:text-slate-400 text-sm">{{ usuario.departamento }} · {{ usuario.semestre }}</p>
              </div>

              <p class="m-0 text-slate-700 dark:text-slate-300 leading-relaxed">
                {{ usuario.bio }}
              </p>

              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="interesse in usuario.interesses"
                  :key="interesse"
                  color="neutral"
                  variant="soft"
                  class="font-semibold"
                >
                  {{ interesse }}
                </UBadge>
              </div>
            </div>
          </div>
        </UCard>

        <section class="grid gap-3">
          <h3 class="m-0 text-slate-900 dark:text-white text-xl font-bold">Inscrições ativas</h3>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <UCard
              v-for="opportunity in inscricoesAtivas"
              :key="opportunity.id"
              class="rounded-xl h-full"
            >
              <div class="grid gap-3">
                <div class="flex items-start justify-between gap-3">
                  <h4 class="m-0 text-slate-900 dark:text-white text-base font-bold leading-snug line-clamp-2">{{ opportunity.titulo }}</h4>
                  <UBadge :color="opportunity.tipo === 'bolsa' ? 'primary' : 'secondary'" variant="soft" class="shrink-0 font-semibold">
                    {{ formatTipo(opportunity.tipo) }}
                  </UBadge>
                </div>

                <p class="m-0 text-slate-600 dark:text-slate-300 text-sm line-clamp-2">
                  {{ opportunity.descricao }}
                </p>

                <div class="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span>Prazo: {{ formatPrazo(opportunity.prazoInscricao) }}</span>
                  <span>•</span>
                  <span>{{ opportunity.local }}</span>
                </div>

                <UButton :to="{ path: `/oportunidades/${opportunity.id}`, query: { from: 'perfil' } }" color="primary" variant="soft" size="sm" class="justify-center">
                  Ver detalhes
                </UButton>
              </div>
            </UCard>
          </div>
        </section>
      </div>

      <aside class="grid gap-4">
        <UCard class="rounded-xl">
          <template #header>
            <h3 class="m-0 text-slate-900 dark:text-white text-lg font-bold">Resumo</h3>
          </template>

          <div class="grid gap-3">
            <div class="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
              <span class="text-slate-600 dark:text-slate-300 font-medium">Inscrições ativas</span>
              <span class="text-slate-900 dark:text-white font-bold">{{ stats.totalAtivas }}</span>
            </div>
            <div class="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
              <span class="text-slate-600 dark:text-slate-300 font-medium">Oportunidades salvas</span>
              <span class="text-slate-900 dark:text-white font-bold">{{ stats.totalSalvas }}</span>
            </div>
            <div class="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
              <span class="text-slate-600 dark:text-slate-300 font-medium">Com certificado</span>
              <span class="text-slate-900 dark:text-white font-bold">{{ stats.totalCertificados }}</span>
            </div>
          </div>
        </UCard>

        <UCard class="rounded-xl">
          <template #header>
            <h3 class="m-0 text-slate-900 dark:text-white text-lg font-bold">Salvas para depois</h3>
          </template>

          <div class="grid gap-3">
            <NuxtLink
              v-for="opportunity in oportunidadesSalvas"
              :key="`saved-${opportunity.id}`"
              :to="{ path: `/oportunidades/${opportunity.id}`, query: { from: 'perfil' } }"
              class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 no-underline hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <p class="m-0 text-slate-900 dark:text-white text-sm font-semibold leading-snug line-clamp-2">{{ opportunity.titulo }}</p>
              <p class="m-0 mt-1 text-slate-500 dark:text-slate-400 text-xs">Até {{ formatPrazo(opportunity.prazoInscricao) }}</p>
            </NuxtLink>
          </div>
        </UCard>
      </aside>
    </div>
  </section>
</template>
