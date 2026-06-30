<script setup lang="ts">
import type { OportunidadeCard } from '~/types/oportunidade'

const { user, logout } = useAuth()

const roleLabel: Record<string, string> = {
  ROLE_STUDENT: 'Estudante',
  ROLE_PROFESSOR: 'Professor',
  ROLE_ADMIN: 'Administrador'
}


const inicial = computed(() => user.value?.nome?.charAt(0).toUpperCase() ?? '?')

const inscricoesAtivas = ref<OportunidadeCard[]>([])
const oportunidadesSalvas = ref<OportunidadeCard[]>([])

const stats = computed(() => ({
  totalAtivas: inscricoesAtivas.value.length,
  totalSalvas: oportunidadesSalvas.value.length,
  totalCertificados: [...inscricoesAtivas.value, ...oportunidadesSalvas.value].filter(i => i.certificado).length
}))

function formatPrazo(date: string) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(`${date}T00:00:00`))
}

function formatTipo(tipo: 'bolsa' | 'voluntariado') {
  return tipo === 'bolsa' ? 'Bolsa' : 'Voluntariado'
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

        <!-- Card de perfil -->
        <UCard class="rounded-xl">
          <div class="flex flex-col md:flex-row md:items-start gap-6">

            <!-- Avatar -->
            <div class="shrink-0">
              <img
                v-if="user?.avatar"
                :src="user.avatar"
                :alt="user.nome"
                class="w-24 h-24 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
              />
              <div
                v-else
                class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center ring-2 ring-slate-200 dark:ring-slate-700"
              >
                <span class="text-white font-bold text-3xl">{{ inicial }}</span>
              </div>
            </div>

            <!-- Dados -->
            <div class="grid gap-4 min-w-0 flex-1">
              <div class="grid gap-2">
                <div class="flex flex-wrap items-center gap-2">
                  <h2 class="m-0 text-slate-900 dark:text-white text-2xl font-bold leading-tight">
                    {{ user?.nome ?? 'Usuário' }}
                  </h2>
                </div>

                <div class="grid gap-1">
                  <div class="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                    <UIcon name="i-heroicons-envelope" class="w-4 h-4 shrink-0 text-slate-400" />
                    <span>{{ user?.email ?? '—' }}</span>
                  </div>
                  <div v-if="user?.departamento" class="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                    <UIcon name="i-heroicons-building-office-2" class="w-4 h-4 shrink-0 text-slate-400" />
                    <span>{{ user.departamento }}</span>
                  </div>
                </div>
              </div>

              <!-- Informações detalhadas -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div class="bg-slate-50 dark:bg-slate-800 rounded-lg px-3 py-2.5">
                  <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Perfil de acesso</p>
                  <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 m-0 mt-0.5">
                    {{ user?.role ? (roleLabel[user.role] ?? user.role) : '—' }}
                  </p>
                </div>
                <div v-if="user?.unidade" class="bg-slate-50 dark:bg-slate-800 rounded-lg px-3 py-2.5">
                  <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Unidade</p>
                  <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 m-0 mt-0.5">{{ user.unidade }}</p>
                </div>
                <div v-if="user?.semestre" class="bg-slate-50 dark:bg-slate-800 rounded-lg px-3 py-2.5">
                  <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Semestre</p>
                  <p class="text-sm font-semibold text-slate-900 dark:text-slate-100 m-0 mt-0.5">{{ user.semestre }}</p>
                </div>
              </div>

              <div v-if="user?.bio" class="bg-slate-50 dark:bg-slate-800 rounded-lg px-3 py-2.5">
                <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 m-0 uppercase tracking-wide">Bio</p>
                <p class="text-sm text-slate-700 dark:text-slate-300 m-0 mt-0.5 leading-relaxed">{{ user.bio }}</p>
              </div>

              <div v-if="user?.interesses?.length" class="flex flex-wrap gap-1.5">
                <UBadge
                  v-for="interesse in user.interesses"
                  :key="interesse"
                  color="primary"
                  variant="soft"
                  class="font-medium text-xs"
                >
                  {{ interesse }}
                </UBadge>
              </div>

              <div>
                <UButton color="error" variant="soft" icon="i-heroicons-arrow-left-on-rectangle" @click="logout">
                  Sair da conta
                </UButton>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Inscrições ativas -->
        <section class="grid gap-3">
          <h3 class="m-0 text-slate-900 dark:text-white text-xl font-bold">Inscrições ativas</h3>

          <div v-if="inscricoesAtivas.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                <p class="m-0 text-slate-600 dark:text-slate-300 text-sm line-clamp-2">{{ opportunity.descricao }}</p>
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

          <div v-else class="flex flex-col items-center gap-3 py-10 text-center bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <UIcon name="i-heroicons-clipboard-document-list" class="w-10 h-10 text-slate-300 dark:text-slate-600" />
            <p class="m-0 text-slate-500 dark:text-slate-400 font-medium">Nenhuma inscrição ativa no momento.</p>
            <UButton to="/oportunidades" color="primary" variant="soft" size="sm">
              Ver oportunidades
            </UButton>
          </div>
        </section>
      </div>

      <!-- Sidebar -->
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

          <div v-if="oportunidadesSalvas.length > 0" class="grid gap-3">
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

          <div v-else class="flex flex-col items-center gap-2 py-6 text-center">
            <UIcon name="i-heroicons-bookmark" class="w-8 h-8 text-slate-300 dark:text-slate-600" />
            <p class="m-0 text-slate-500 dark:text-slate-400 text-sm">Nenhuma oportunidade salva.</p>
          </div>
        </UCard>
      </aside>
    </div>
  </section>
</template>
