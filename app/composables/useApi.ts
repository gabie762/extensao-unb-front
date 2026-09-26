export const useApi = () => {
  const { token, logout } = useAuth()

  const apiFetch = $fetch.create({
    baseURL: useApiBase(),
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
