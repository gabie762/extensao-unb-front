import type { Usuario, LoginResponse } from '~/types/usuario'

export const useAuth = () => {
  const token = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/'
  })
  
  const user = useState<Usuario | null>('auth_user', () => null)
  
  const isAuthenticated = computed(() => !!token.value)
  
  const login = async (credentials: { email: string; senha: string }) => {
    try {
      const config = useRuntimeConfig()
      const data = await $fetch<LoginResponse>('/auth/login', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: credentials
      })
      
      token.value = data.token
      user.value = data.user
      
      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }
  
  const logout = () => {
    token.value = null
    user.value = null
    navigateTo('/login')
  }

  const fetchCurrentUser = async () => {
    if (!token.value) return
    
    try {
      const config = useRuntimeConfig()
      const data = await $fetch<Usuario>('/usuarios/me', { // Hypothetical endpoint for current user
        baseURL: config.public.apiBase,
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      user.value = data
    } catch (error) {
      console.error('Fetch user error:', error)
      logout()
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    fetchCurrentUser
  }
}
