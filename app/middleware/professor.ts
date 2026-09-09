export default defineNuxtRouteMiddleware(() => {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }

  if (!['ROLE_PROFESSOR', 'ROLE_ADMIN'].includes(user.value?.role || '')) {
    return navigateTo('/projetos')
  }
})
