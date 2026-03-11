<template>
    <nav class="nav">
        <NuxtLink to="/" class="logo" aria-label="Ir para início">
            <svg
                class="logo-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M8.5 10.5L12 12.5L15.5 10.5"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
            <span>Extensão UnB</span>
        </NuxtLink>

        <div class="links">
            <NuxtLink to="/" class="link">Início</NuxtLink>
            <NuxtLink to="/projetos" class="link">Projetos</NuxtLink>
            <NuxtLink to="/oportunidades" class="link">Oportunidades</NuxtLink>
            <NuxtLink to="/perfil" class="profile-link" aria-label="Abrir perfil do usuário">
                <img src="/images/default-avatar.svg" alt="Foto de perfil do usuário" class="profile-avatar" />
            </NuxtLink>
        </div>
    </nav>
</template>

<style scoped>
.nav {
    width: 100%;
    box-sizing: border-box;
    padding: 0.875rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.logo {
    color: #fff;
    text-decoration: none;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.logo-icon {
    width: 1.2rem;
    height: 1.2rem;
    flex-shrink: 0;
}

.links {
    display: flex;
    gap: 1.75rem;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
}

.link {
    color: #cbd5e1;
    text-decoration: none;
    font-weight: 500;
}

.profile-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.profile-avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    object-fit: cover;
    border: 2px solid #cbd5e1;
    background: #e2e8f0;
}

.link:hover,
.router-link-active,
.profile-link:hover .profile-avatar {
    color: #fff;
}
</style>