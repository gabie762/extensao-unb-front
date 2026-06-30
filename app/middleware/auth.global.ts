export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, user } = useAuth()

  // Public routes that don't need auth
  const publicRoutes = ['/', '/oportunidades', '/login']
  const isPublic = publicRoutes.includes(to.path) || to.path.startsWith('/oportunidades/')

  if (!isAuthenticated.value && !isPublic) {
    return navigateTo('/login')
  }

  // Example of Role-based check
  if (to.path.startsWith('/admin') && user.value?.role !== 'ROLE_ADMIN') {
    return navigateTo('/')
  }
  
  if (to.path.startsWith('/professor') && !['ROLE_PROFESSOR', 'ROLE_ADMIN'].includes(user.value?.role || '')) {
    return navigateTo('/')
  }
})
