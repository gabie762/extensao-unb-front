/**
 * Endereco do backend a usar na chamada atual. Do lado do navegador, sempre o
 * endereco publico (NUXT_PUBLIC_API_BASE). Do lado do servidor (SSR), usa o
 * endereco interno (NUXT_API_BASE_SERVER) quando ele estiver configurado -
 * necessario quando frontend e backend rodam em containers separados, onde
 * "localhost" dentro do container do frontend nao aponta pro container do
 * backend. Sem NUXT_API_BASE_SERVER definido, cai no mesmo valor publico -
 * continua funcionando igual em dev local.
 */
export function useApiBase() {
  const config = useRuntimeConfig()
  return import.meta.server && config.apiBaseServer
    ? config.apiBaseServer
    : config.public.apiBase
}
