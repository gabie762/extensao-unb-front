<template>
    <header class="topbar">
        <UContainer class="topbar-inner flex items-center justify-between gap-6 py-3">
            <NuxtLink to="/" class="brand-link flex items-center gap-4 text-white font-bold no-underline">
                <UIcon name="i-heroicons-academic-cap" class="h-10 w-10" />
                <span>Extensão UnB</span>
            </NuxtLink>

            <nav class="desktop-nav hidden md:flex items-center gap-3">
                <UButton
                    v-for="link in links"
                    :key="link.to"
                    :to="link.to"
                    variant="ghost"
                    color="neutral"
                    size="xl"
                    class="nav-button"
                >
                    {{ link.label }}
                </UButton>
            </nav>

            <div class="flex items-center gap-3">
                <UButton
                    to="/perfil"
                    variant="ghost"
                    color="neutral"
                    size="xl"
                    class="profile-button hidden md:inline-flex"
                >
                    <UAvatar src="/images/default-avatar.svg" alt="Perfil do usuário" class="profile-avatar" />
                </UButton>

                <UButton
                    variant="ghost"
                    color="neutral"
                    size="xl"
                    icon="i-heroicons-bars-3"
                    class="mobile-menu-toggle md:hidden"
                    :aria-label="isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'"
                    @click="isMobileMenuOpen = !isMobileMenuOpen"
                />
            </div>
        </UContainer>

        <UContainer v-if="isMobileMenuOpen" class="mobile-menu-wrapper md:hidden pb-5">
            <div class="mobile-menu">
                <UButton
                    v-for="link in links"
                    :key="`mobile-${link.to}`"
                    :to="link.to"
                    variant="ghost"
                    color="neutral"
                    size="xl"
                    block
                    class="mobile-nav-button justify-start"
                    @click="isMobileMenuOpen = false"
                >
                    {{ link.label }}
                </UButton>

                <UButton
                    to="/perfil"
                    variant="ghost"
                    color="neutral"
                    size="xl"
                    block
                    class="mobile-profile-button justify-start"
                    @click="isMobileMenuOpen = false"
                >
                    <template #leading>
                        <UAvatar src="/images/default-avatar.svg" alt="Perfil do usuário" class="mobile-profile-avatar" />
                    </template>
                    Perfil
                </UButton>
            </div>
        </UContainer>
    </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)

const links = [
  { label: 'Início', to: '/' },
  { label: 'Projetos', to: '/projetos' },
  { label: 'Oportunidades', to: '/oportunidades' }
]
</script>

<style scoped>
.topbar {
    background: #0f172a;
    border-bottom: 1px solid #1e293b;
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
}

.topbar-inner {
    min-height: 4.75rem;
}

.brand-link {
    font-size: 1.5rem;
    letter-spacing: -0.02em;
}

.desktop-nav {
    flex: 1;
    justify-content: center;
}

.nav-button {
    min-height: 3.25rem;
    padding: 0 1rem;
}

.nav-button :deep(span) {
    font-size: 1.05rem;
    font-weight: 600;
}

.profile-button {
    min-height: 3.5rem;
    min-width: 3.5rem;
    padding: 0.375rem;
}

.profile-avatar {
    width: 2.5rem;
    height: 2.5rem;
}

.mobile-menu-toggle {
    min-height: 3.5rem;
    min-width: 3.5rem;
}

.mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: rgba(15, 23, 42, 0.96);
    border: 1px solid #1e293b;
    border-radius: 1rem;
    padding: 1rem;
}

.mobile-nav-button,
.mobile-profile-button {
    min-height: 3.5rem;
}

.mobile-nav-button :deep(span),
.mobile-profile-button :deep(span) {
    font-size: 1rem;
    font-weight: 600;
}

.mobile-profile-avatar {
    width: 2rem;
    height: 2rem;
}
</style>