<script setup lang="ts">
const { verificarEmail } = useAuth()
const route = useRoute()
const router = useRouter()

const estado = ref<'verificando' | 'sucesso' | 'erro'>('verificando')

onMounted(async () => {
  const token = route.query.token
  if (!token || typeof token !== 'string') {
    estado.value = 'erro'
    return
  }

  try {
    await verificarEmail(token)
    estado.value = 'sucesso'
    setTimeout(() => router.push('/'), 1500)
  } catch (err) {
    estado.value = 'erro'
    console.error(err)
  }
})

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-6 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 text-center">

      <div v-if="estado === 'verificando'" class="flex flex-col items-center gap-4 py-4">
        <UIcon name="i-heroicons-arrow-path" class="w-16 h-16 text-blue-600 animate-spin" />
        <p class="text-slate-900 dark:text-white font-bold text-lg">Verificando seu e-mail...</p>
      </div>

      <div v-else-if="estado === 'sucesso'" class="flex flex-col items-center gap-4 py-4">
        <UIcon name="i-heroicons-check-circle" class="w-16 h-16 text-green-500" />
        <div>
          <p class="text-slate-900 dark:text-white font-bold text-lg">E-mail confirmado!</p>
          <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Redirecionando para o portal...
          </p>
        </div>
      </div>

      <div v-else class="flex flex-col items-center gap-4 py-4">
        <UIcon name="i-heroicons-x-circle" class="w-16 h-16 text-red-500" />
        <div>
          <p class="text-slate-900 dark:text-white font-bold text-lg">Link inválido ou expirado</p>
          <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Solicite um novo e-mail de verificação.
          </p>
        </div>
        <UButton to="/reenviar-verificacao" block size="xl" class="font-bold">
          Reenviar e-mail de verificação
        </UButton>
      </div>

    </div>
  </div>
</template>
