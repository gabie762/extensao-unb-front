<script setup lang="ts">
const { login } = useAuth()
const router = useRouter()

const credentials = reactive({
  email: '',
  senha: ''
})

const loading = ref(false)
const error = ref('')

async function handleLogin() {
  if (!credentials.email || !credentials.senha) {
    error.value = 'Por favor, preencha todos os campos.'
    return
  }

  loading.value = true
  error.value = ''
  try {
    await login(credentials)
    router.push('/')
  } catch (err: any) {
    error.value = 'Falha no login. Verifique suas credenciais.'
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
          Acesse o Portal
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Utilize seu e-mail institucional da UnB
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <UFormField label="E-mail" required>
            <UInput 
              v-model="credentials.email" 
              type="email" 
              placeholder="exemplo@unb.br" 
              icon="i-heroicons-envelope"
              size="xl"
              block
            />
          </UFormField>

          <UFormField label="Senha" required>
            <UInput 
              v-model="credentials.senha" 
              type="password" 
              placeholder="••••••••" 
              icon="i-heroicons-lock-closed"
              size="xl"
              block
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
          Entrar no sistema
        </UButton>

        <div class="text-center text-sm text-slate-500">
          Não tem uma conta? 
          <NuxtLink to="/cadastro" class="text-blue-600 hover:underline font-semibold">Cadastre-se</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>
