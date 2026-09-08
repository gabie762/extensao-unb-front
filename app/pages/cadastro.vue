<script setup lang="ts">
const { login } = useAuth()
const router = useRouter()
const config = useRuntimeConfig()

const form = reactive({
  nome: '',
  email: '',
  senha: '',
  confirmarSenha: '',
  role: 'ROLE_STUDENT' as 'ROLE_STUDENT' | 'ROLE_PROFESSOR'
})

const loading = ref(false)
const error = ref('')
const sucesso = ref(false)

const roleOptions = [
  { label: 'Estudante', value: 'ROLE_STUDENT' },
  { label: 'Professor', value: 'ROLE_PROFESSOR' }
]

async function handleCadastro() {
  error.value = ''

  if (!form.nome || !form.email || !form.senha || !form.confirmarSenha) {
    error.value = 'Por favor, preencha todos os campos.'
    return
  }

  if (form.senha !== form.confirmarSenha) {
    error.value = 'As senhas não coincidem.'
    return
  }

  if (form.senha.length < 8) {
    error.value = 'A senha deve ter pelo menos 8 caracteres.'
    return
  }

  loading.value = true
  try {
    const data = await $fetch<{ token?: string }>('/auth/cadastro', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        role: form.role
      }
    })

    if (data?.token) {
      await login({ email: form.email, senha: form.senha })
      router.push('/')
    } else {
      sucesso.value = true
    }
  } catch (err: any) {
    const status = err?.status ?? err?.response?.status
    if (status === 409) {
      error.value = 'Este e-mail já está cadastrado.'
    } else {
      error.value = 'Erro ao criar conta. Tente novamente.'
    }
    console.error(err)
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">

      <div class="text-center">
        <UIcon name="i-heroicons-academic-cap" class="mx-auto h-16 w-16 text-blue-600" />
        <h2 class="mt-6 text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Criar conta
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Utilize seu e-mail institucional da UnB
        </p>
      </div>

      <!-- Estado de sucesso -->
      <div v-if="sucesso" class="flex flex-col items-center gap-4 py-4 text-center">
        <UIcon name="i-heroicons-check-circle" class="w-16 h-16 text-green-500" />
        <div>
          <p class="text-slate-900 dark:text-white font-bold text-lg">Cadastro realizado!</p>
          <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Sua conta foi criada com sucesso. Faça login para continuar.
          </p>
        </div>
        <UButton to="/login" block size="xl" class="font-bold">
          Ir para o login
        </UButton>
      </div>

      <form v-else class="mt-8 space-y-6" @submit.prevent="handleCadastro">
        <div class="space-y-4">

          <UFormField label="Nome completo" required class="w-full">
            <UInput
              v-model="form.nome"
              type="text"
              placeholder="Seu nome completo"
              icon="i-heroicons-user"
              size="xl"
              class="w-full"
            />
          </UFormField>

          <UFormField label="E-mail institucional" required class="w-full">
            <UInput
              v-model="form.email"
              type="email"
              placeholder="exemplo@unb.br"
              icon="i-heroicons-envelope"
              size="xl"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Você é" required class="w-full">
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="opt in roleOptions"
                :key="opt.value"
                type="button"
                class="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 text-sm font-semibold transition-all cursor-pointer"
                :class="form.role === opt.value
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'"
                @click="form.role = opt.value as typeof form.role"
              >
                <UIcon
                  :name="opt.value === 'ROLE_STUDENT' ? 'i-heroicons-book-open' : 'i-heroicons-briefcase'"
                  class="w-4 h-4"
                />
                {{ opt.label }}
              </button>
            </div>
          </UFormField>

          <UFormField label="Senha" required class="w-full">
            <UInput
              v-model="form.senha"
              type="password"
              placeholder="Mínimo 8 caracteres"
              icon="i-heroicons-lock-closed"
              size="xl"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Confirmar senha" required class="w-full">
            <UInput
              v-model="form.confirmarSenha"
              type="password"
              placeholder="Repita a senha"
              icon="i-heroicons-lock-closed"
              size="xl"
              class="w-full"
            />
          </UFormField>

        </div>

        <div v-if="error" class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-600 dark:text-red-400 text-sm text-center border border-red-100 dark:border-red-900/30">
          {{ error }}
        </div>

        <UButton
          type="submit"
          block
          size="xl"
          :loading="loading"
          class="font-bold py-4"
        >
          Criar conta
        </UButton>

        <p class="text-center text-sm text-slate-600 dark:text-slate-400">
          Já tem uma conta?
          <NuxtLink to="/login" class="text-blue-600 hover:text-blue-700 font-semibold">
            Fazer login
          </NuxtLink>
        </p>
      </form>

    </div>
  </div>
</template>
