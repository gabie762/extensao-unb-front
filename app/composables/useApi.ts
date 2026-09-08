export const useApi = () => {
  const config = useRuntimeConfig()
  const { token, logout } = useAuth()

  const apiFetch = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      if (token.value) {
        const headers = new Headers(options.headers)
        headers.set('Authorization', `Bearer ${token.value}`)
        options.headers = headers
      }
    },
    onResponseError({ response }) {
      if (response.status === 401 || response.status === 403) {
        logout()
      }
    }
  })

  return apiFetch
}
