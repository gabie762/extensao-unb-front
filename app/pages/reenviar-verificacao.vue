<script setup lang="ts">
const config = useRuntimeConfig()

const email = ref('')
const loading = ref(false)
const enviado = ref(false)
const error = ref('')

async function handleReenvio() {
  if (!email.value) {
    error.value = 'Informe seu e-mail.'
    return
  }

  loading.value = true
  error.value = ''
  try {
    await $fetch('/auth/reenviar-verificacao', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: { email: email.value }
    })
    enviado.value = true
  } catch (err) {
    error.value = 'Não foi possível processar sua solicitação. Tente novamente.'
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
        <UIcon name="i-heroicons-envelope" class="mx-auto h-16 w-16 text-blue-600" />
        <h2 class="mt-6 text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Reenviar verificação
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Informe o e-mail usado no cadastro
        </p>
      </div>

      <div v-if="enviado" class="flex flex-col items-center gap-4 py-4 text-center">
        <UIcon name="i-heroicons-check-circle" class="w-16 h-16 text-green-500" />
        <p class="text-slate-600 dark:text-slate-400 text-sm">
          Se o e-mail estiver cadastrado e pendente de verificação, enviamos um novo link.
        </p>
        <UButton to="/login" block size="xl" class="font-bold">
          Ir para o login
        </UButton>
      </div>

      <form v-else class="space-y-6" @submit.prevent="handleReenvio">
        <UFormField label="E-mail institucional" required class="w-full">
          <UInput
            v-model="email"
            type="email"
            placeholder="exemplo@unb.br"
            icon="i-heroicons-envelope"
            size="xl"
            class="w-full"
          />
        </UFormField>

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
          Reenviar e-mail
        </UButton>
      </form>

    </div>
  </div>
</template>
