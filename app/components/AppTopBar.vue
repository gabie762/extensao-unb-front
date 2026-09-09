<script setup lang="ts">
const isMobileMenuOpen = ref(false)
const colorMode = useColorMode()
const { user } = useAuth()

const links = [
  { label: 'Início', to: '/' },
  { label: 'Projetos', to: '/projetos' },
  { label: 'Oportunidades', to: '/oportunidades' }
]

const podeCadastrar = computed(() => ['ROLE_PROFESSOR', 'ROLE_ADMIN'].includes(user.value?.role || ''))
</script>

<template>
    <header class="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg">
        <UContainer class="min-h-[4.75rem] flex items-center justify-between gap-6 py-3">
            <NuxtLink to="/" class="flex items-center gap-4 text-white font-bold no-underline text-2xl tracking-[-0.02em]">
                <UIcon name="i-heroicons-academic-cap" class="h-10 w-10" />
                <span>Extensão UnB</span>
            </NuxtLink>

            <nav class="hidden md:flex items-center gap-3 flex-1 justify-center">
                <UButton
                    v-for="link in links"
                    :key="link.to"
                    :to="link.to"
                    variant="ghost"
                    color="neutral"
                    size="xl"
                    class="min-h-[3.25rem] px-4 text-[1.05rem] font-semibold text-white"
                >
                    {{ link.label }}
                </UButton>
            </nav>

            <div class="flex items-center gap-3">
                <UButton
                    v-if="podeCadastrar"
                    to="/projetos/novo"
                    variant="solid"
                    color="primary"
                    size="xl"
                    icon="i-heroicons-plus"
                    class="hidden md:inline-flex font-bold"
                >
                    Cadastrar ação
                </UButton>

                <UButton
                    to="/perfil"
                    variant="ghost"
                    color="neutral"
                    size="xl"
                    class="hidden md:inline-flex min-h-[3.5rem] min-w-[3.5rem] p-1.5"
                >
                    <UAvatar src="/images/default-avatar.svg" alt="Perfil do usuário" class="w-10 h-10" />
                </UButton>

                <ClientOnly>
                    <UButton
                        variant="ghost"
                        color="neutral"
                        size="xl"
                        :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                        :aria-label="colorMode.value === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'"
                        class="text-white"
                        @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
                    />
                    <template #fallback>
                        <UButton variant="ghost" color="neutral" size="xl" icon="i-heroicons-moon" class="text-white" aria-label="Alternar modo" />
                    </template>
                </ClientOnly>

                <UButton
                    variant="ghost"
                    color="neutral"
                    size="xl"
                    icon="i-heroicons-bars-3"
                    class="md:hidden min-h-[3.5rem] min-w-[3.5rem] text-white"
                    :aria-label="isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'"
                    @click="isMobileMenuOpen = !isMobileMenuOpen"
                />
            </div>
        </UContainer>

        <UContainer v-if="isMobileMenuOpen" class="md:hidden pb-5">
            <div class="flex flex-col gap-3 bg-slate-900/95 border border-slate-800 rounded-2xl p-4">
                <UButton
                    v-for="link in links"
                    :key="`mobile-${link.to}`"
                    :to="link.to"
                    variant="ghost"
                    color="neutral"
                    size="xl"
                    block
                    class="min-h-[3.5rem] justify-start font-semibold"
                    @click="isMobileMenuOpen = false"
                >
                    {{ link.label }}
                </UButton>

                <UButton
                    v-if="podeCadastrar"
                    to="/projetos/novo"
                    variant="solid"
                    color="primary"
                    size="xl"
                    icon="i-heroicons-plus"
                    block
                    class="justify-start font-bold"
                    @click="isMobileMenuOpen = false"
                >
                    Cadastrar ação
                </UButton>

                <UButton
                    to="/perfil"
                    variant="ghost"
                    color="neutral"
                    size="xl"
                    block
                    class="min-h-[3.5rem] justify-start font-semibold"
                    @click="isMobileMenuOpen = false"
                >
                    <template #leading>
                        <UAvatar src="/images/default-avatar.svg" alt="Perfil do usuário" class="w-8 h-8" />
                    </template>
                    Perfil
                </UButton>
            </div>
        </UContainer>
    </header>
</template>