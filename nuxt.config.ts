// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    // Server-only: usado quando o Nuxt roda em SSR dentro de um container e precisa
    // falar com o backend por dentro da rede Docker (ex: http://backend:8080), em vez
    // do endereco publico. Se nao for definido, cai no mesmo valor de apiBase abaixo -
    // continua funcionando igual em dev local, onde as duas coisas sao a mesma URL.
    apiBaseServer: '', // NUXT_API_BASE_SERVER env var will override this
    public: {
      apiBase: '' // NUXT_PUBLIC_API_BASE env var will override this
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        }
      ]
    }
  }
})
