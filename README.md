# Extensão UnB — Frontend

Site (Nuxt 4 / Vue 3) para divulgar projetos, oportunidades e eventos de extensão
da UnB. Fala com a API do [backend](../extensao-unb-back).

## Rodando o sistema completo (recomendado)

Este repositório **não sobe sozinho** no fluxo principal — o `docker compose` que
builda e orquestra tudo (banco, backend, frontend e proxy reverso) vive no
repositório do backend. Veja as instruções completas lá:

👉 **[extensao-unb-back/backend/README.md](../extensao-unb-back/backend/README.md)**

Resumindo: os dois repositórios precisam estar clonados lado a lado (mesmos
nomes de pasta), e você roda `docker compose up --build` de dentro de
`extensao-unb-back/backend`.

## Desenvolvimento local (só o frontend)

Se você já tem o backend rodando em algum lugar (local ou remoto) e só quer
mexer no frontend com hot-reload:

```bash
npm install
cp .env.example .env   # ajuste NUXT_PUBLIC_API_BASE se o backend não estiver em localhost:8080
npm run dev
```

Site disponível em http://localhost:3000, com hot-reload a cada mudança.

## Variáveis de ambiente

| Variável | Para que serve |
|---|---|
| `NUXT_PUBLIC_API_BASE` | Endereço do backend que o **navegador** usa (roda na máquina de quem acessa o site) |
| `NUXT_API_BASE_SERVER` | Endereço do backend que o **servidor** (SSR, dentro do container) usa. Opcional — se não definido, usa o mesmo valor de `NUXT_PUBLIC_API_BASE` |

Por que dois endereços? Nuxt renderiza páginas tanto no navegador quanto no
servidor (SSR). Quando frontend e backend rodam em **containers separados**,
`localhost` significa coisas diferentes em cada contexto: no navegador,
`localhost` é a máquina de quem está acessando; no servidor (dentro do
container), `localhost` é o próprio container do frontend — não alcança o
backend. Por isso o SSR precisa de um endereço à parte (o nome do serviço
Docker, ex: `http://backend:8080`), enquanto o navegador continua usando o
endereço público de sempre.

Em desenvolvimento local sem Docker, as duas coisas são a mesma URL, então só
`NUXT_PUBLIC_API_BASE` já basta.

## Build de produção (sem Docker)

```bash
npm run build
node .output/server/index.mjs
```

## Docker (standalone)

Normalmente esta imagem é buildada pelo `docker compose` do backend, mas dá pra
buildar e rodar isolada:

```bash
docker build -t extensao-unb-front .
docker run -p 3000:3000 \
  -e NUXT_PUBLIC_API_BASE=http://localhost:8080 \
  extensao-unb-front
```
