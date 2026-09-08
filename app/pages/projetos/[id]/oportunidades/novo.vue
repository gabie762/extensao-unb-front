<script setup lang="ts">
import type { Projeto } from '~/types/projeto'
import type { OportunidadeCard } from '~/types/oportunidade'

definePageMeta({
  middleware: 'professor'
})

const route = useRoute()
const apiFetch = useApi()
const { user } = useAuth()

const { data: projeto, pending, error: fetchError } = await useAsyncData<Projeto>(
  `projeto-oportunidade-${route.params.id}`,
  () => apiFetch<Projeto>(`/projetos/${route.params.id}`)
)

const podeGerenciar = computed(() => {
  if (!user.value || !projeto.value) return false
  if (user.value.role === 'ROLE_ADMIN') return true
  return user.value.role === 'ROLE_PROFESSOR' && user.value.id === projeto.value.coordenador?.id
})

const form = reactive({
  titulo: '',
  descricao: '',
  sobreProjeto: '',
  tipo: 'bolsa' as 'bolsa' | 'voluntariado',
  local: '',
  cargaHoraria: '',
  vagas: undefined as number | undefined,
  prazoInscricao: '',
  certificado: false,
  objetivosInput: '',
  atividadesInput: '',
  comoParticiparInput: '',
  requisitosInput: ''
})

const tipoOptions = [
  { label: 'Bolsa', value: 'bolsa' as const },
  { label: 'Voluntariado', value: 'voluntariado' as const }
]

const loading = ref(false)
const error = ref('')

function linhas(texto: string) {
  return texto
    .split('\n')
    .map((linha) => linha.trim())
    .filter(Boolean)
}

async function handleSubmit() {
  error.value = ''

  if (!form.titulo || !form.descricao || !form.local || !form.cargaHoraria || !form.prazoInscricao) {
    error.value = 'Por favor, preencha todos os campos obrigatórios.'
    return
  }

  if (!projeto.value) return

  const body: Record<string, unknown> = {
    projetoId: projeto.value.id,
    titulo: form.titulo,
    descricao: form.descricao,
    sobreProjeto: form.sobreProjeto || undefined,
    tipo: form.tipo,
    local: form.local,
    cargaHoraria: form.cargaHoraria,
    vagas: form.vagas,
    prazoInscricao: form.prazoInscricao,
    certificado: form.certificado,
    objetivos: linhas(form.objetivosInput),
    atividadesDesenvolvidas: linhas(form.atividadesInput),
    comoParticipar: linhas(form.comoParticiparInput),
    requisitos: form.requisitosInput.split(',').map((r) => r.trim()).filter(Boolean)
  }

  loading.value = true
  try {
    const criada = await apiFetch<OportunidadeCard>('/oportunidades', {
      method: 'POST',
      body
    })

    await refreshNuxtData()
    await navigateTo(`/oportunidades/${criada.id}`)
  } catch (err: any) {
    const status = err?.status ?? err?.response?.status
    error.value = status === 400
      ? 'Dados inválidos. Verifique os campos preenchidos.'
      : 'Erro ao publicar a oportunidade. Tente novamente.'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="pending" class="flex justify-center py-16">
    <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary" />
  </div>

  <div v-else-if="fetchError || !projeto" class="flex flex-col gap-4 py-8">
    <h1 class="m-0 text-2xl font-bold text-slate-900 dark:text-white">Projeto não encontrado</h1>
    <UButton to="/projetos" color="primary" variant="solid" class="w-fit">Voltar para projetos</UButton>
  </div>

  <div v-else-if="!podeGerenciar" class="flex flex-col gap-4 py-8">
    <h1 class="m-0 text-2xl font-bold text-slate-900 dark:text-white">Acesso não permitido</h1>
    <p class="m-0 text-slate-600 dark:text-slate-300">Você não tem permissão para publicar vagas neste projeto.</p>
    <UButton :to="`/projetos/${projeto.id}`" color="primary" variant="solid" class="w-fit">Voltar para o projeto</UButton>
  </div>

  <section v-else class="flex flex-col gap-6 max-w-3xl mx-auto">
    <header class="grid gap-3">
      <NuxtLink :to="`/projetos/${projeto.id}`" class="text-sm font-semibold text-primary hover:underline w-fit">
        ← Voltar para o projeto
      </NuxtLink>
      <p class="m-0 text-blue-600 text-sm font-bold tracking-wider uppercase">Nova oportunidade</p>
      <h1 class="m-0 text-slate-900 dark:text-white text-[clamp(2rem,3vw,2.5rem)] font-bold tracking-tight">
        Publicar vaga em "{{ projeto.titulo }}"
      </h1>
      <p class="max-w-[720px] m-0 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
        Divulgue uma vaga de bolsa ou voluntariado vinculada a esta ação de extensão.
      </p>
    </header>

    <UCard class="rounded-xl">
      <form class="grid gap-5" @submit.prevent="handleSubmit">
        <UFormField label="Título" required class="w-full">
          <UInput v-model="form.titulo" placeholder="Ex: Bolsista de desenvolvimento web" size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Descrição" required class="w-full">
          <UTextarea v-model="form.descricao" placeholder="Descreva a vaga e as responsabilidades" :rows="4" size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Sobre o projeto" hint="Opcional — contexto adicional exibido na página da vaga" class="w-full">
          <UTextarea v-model="form.sobreProjeto" :rows="3" size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Tipo" required class="w-full">
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="opt in tipoOptions"
              :key="opt.value"
              type="button"
              class="px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-all cursor-pointer"
              :class="form.tipo === opt.value
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'"
              @click="form.tipo = opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </UFormField>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <UFormField label="Local" required class="w-full">
            <UInput v-model="form.local" placeholder="Ex: Faculdade de Tecnologia" size="xl" class="w-full" />
          </UFormField>

          <UFormField label="Carga horária" required class="w-full">
            <UInput v-model="form.cargaHoraria" placeholder="Ex: 20h semanais" size="xl" class="w-full" />
          </UFormField>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <UFormField label="Vagas" class="w-full">
            <UInput v-model.number="form.vagas" type="number" min="0" size="xl" class="w-full" />
          </UFormField>

          <UFormField label="Prazo de inscrição" required class="w-full">
            <UInput v-model="form.prazoInscricao" type="date" size="xl" class="w-full" />
          </UFormField>
        </div>

        <UFormField label="Oferece certificado?" class="w-full">
          <UCheckbox v-model="form.certificado" label="Sim, esta vaga oferece certificado" />
        </UFormField>

        <UFormField label="Requisitos" hint="Separe por vírgula" class="w-full">
          <UInput v-model="form.requisitosInput" placeholder="Ex: Cursando graduação, disponibilidade de 20h" size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Objetivos" hint="Um por linha" class="w-full">
          <UTextarea v-model="form.objetivosInput" :rows="3" size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Atividades desenvolvidas" hint="Uma por linha" class="w-full">
          <UTextarea v-model="form.atividadesInput" :rows="3" size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Como participar" hint="Um passo por linha" class="w-full">
          <UTextarea v-model="form.comoParticiparInput" :rows="3" size="xl" class="w-full" />
        </UFormField>

        <div v-if="error" class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-600 dark:text-red-400 text-sm text-center border border-red-100 dark:border-red-900/30">
          {{ error }}
        </div>

        <div class="flex justify-end gap-3">
          <UButton :to="`/projetos/${projeto.id}`" color="neutral" variant="ghost" size="xl">Cancelar</UButton>
          <UButton type="submit" size="xl" :loading="loading" class="font-bold">Publicar vaga</UButton>
        </div>
      </form>
    </UCard>
  </section>
</template>
