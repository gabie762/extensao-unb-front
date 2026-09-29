# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # production build
npm run preview    # preview production build locally
npm run generate   # static site generation
```

There are no tests configured in this project.

## Environment

Copy `.env` and set the backend URL:

```
NUXT_PUBLIC_API_BASE=http://localhost:8080
```

## Architecture

This is a **Nuxt 4** app (Vue 3 + TypeScript) using **Nuxt UI v4** and **Tailwind CSS v4**. Nuxt 4 places all app source under `app/` instead of the project root.

### HTTP and Auth

- `useApi()` (`app/composables/useApi.ts`) — a pre-configured `$fetch` instance that injects `Authorization: Bearer <token>` on every request and calls `logout()` on 401/403.
- `useAuth()` (`app/composables/useAuth.ts`) — manages a JWT stored in the `auth_token` cookie (1-week TTL via `useCookie`) and the `auth_user` global state. Exposes `login`, `logout`, `fetchCurrentUser`, `isAuthenticated`, `user`, `token`.
- Use `useApi()` for authenticated endpoints; use `$fetch` directly (or `useFetch`) only for public endpoints.

### Route Guard

`app/middleware/auth.global.ts` runs on every navigation. Public routes (no auth required): `/`, `/oportunidades`, `/oportunidades/*`, `/login`, `/cadastro`. Role-based guards check `user.value?.role` against `ROLE_ADMIN` and `ROLE_PROFESSOR`.

### Pages and routing

File-based routing under `app/pages/`. Notable pattern in `oportunidades.vue`: it renders `<NuxtPage />` when `route.params.id` is present, delegating to `app/pages/oportunidades/[id].vue`. This means the list and detail views share the same parent page component.

### Composables

- `useOportunidades()` (`app/composables/useOportunidades.ts`) — fetches `/oportunidades` via `useFetch`, owns all filter state (type, certificate, deadline, search term), and exposes `filteredOpportunities` as a computed. All filter labels use Portuguese (e.g. `termoBusca`, `filtroAtivo`), while returned keys are English (e.g. `searchTerm`, `activeFilter`).

### Types

All domain types live in `app/types/`:
- `Oportunidade` / `OportunidadeCard` — opportunity with embedded `Projeto`
- `Projeto` — extension project with `coordenador: Usuario`, `status: 'aberto' | 'em_andamento' | 'encerrado'`, `area: AreaConhecimento`
- `Usuario` / `LoginResponse` — user with `role: 'ROLE_STUDENT' | 'ROLE_PROFESSOR' | 'ROLE_ADMIN'`

### Static mock data

`app/data/oportunidades.ts` exports hardcoded `OportunidadeCard[]` and `filterOptions`. This was used before the API was wired up; the composable now fetches from the backend.

### Date handling

API dates are `YYYY-MM-DD` strings. Always append `T00:00:00` when constructing `Date` objects (e.g. `new Date(dateStr + 'T00:00:00')`) to avoid timezone-offset bugs. Format for display with `new Intl.DateTimeFormat('pt-BR')`.

### UI conventions

- Components use **Nuxt UI** (`UButton`, `UCard`, `UBadge`, `UIcon`, etc.) — icons use Heroicons via `i-heroicons-*` names.
- Layout (`app/layouts/default.vue`) wraps all pages with `AppTopBar` and a centered `max-w-[1540px]` main area.
- Dark mode is supported via `useColorMode()` — always include `dark:` variants for background and text colors.
- The UI language is **Brazilian Portuguese** (pt-BR).
