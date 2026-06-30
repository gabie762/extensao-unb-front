import type { Usuario, LoginResponse, UserRole } from '~/types/usuario'

export const useAuth = () => {
  const token = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  })

  const userCookie = useCookie<Usuario | null>('auth_user', {
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  })

  const user = useState<Usuario | null>('auth_user', () => userCookie.value)
  
  const isAuthenticated = computed(() => !!token.value)
  
  const papelParaRole = (papeis?: string[]): UserRole => {
    if (!papeis?.length) return 'ROLE_STUDENT'
    if (papeis.some(p => /admin/i.test(p))) return 'ROLE_ADMIN'
    if (papeis.some(p => /professor/i.test(p))) return 'ROLE_PROFESSOR'
    return 'ROLE_STUDENT'
  }

  const login = async (credentials: { email: string; senha: string }) => {
    try {
      const config = useRuntimeConfig()
      const data = await $fetch<LoginResponse>('/auth/login', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: credentials
      })

      token.value = data.token
      await fetchCurrentUser()

      return data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }
  
  const logout = () => {
    token.value = null
    user.value = null
    userCookie.value = null
    navigateTo('/login')
  }

  const fetchCurrentUser = async () => {
    if (!token.value) return

    try {
      const config = useRuntimeConfig()
      const dto = await $fetch<any>('/auth/me', {
        baseURL: config.public.apiBase,
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      const userData: Usuario = {
        id: dto.id,
        nome: dto.nome,
        email: dto.email,
        role: papelParaRole(dto.papeis),
        papeis: dto.papeis,
        unidade: dto.unidade,
        semestre: dto.semestre,
        interesses: dto.interesses,
        bio: dto.bio
      }
      user.value = userData
      userCookie.value = userData
    } catch (error: any) {
      if (error?.status === 401 || error?.status === 403) {
        logout()
      }
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
