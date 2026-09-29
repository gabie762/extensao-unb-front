# ---- Etapa 1: build ----
# Instala as dependencias e gera o build de producao do Nuxt (pasta .output).
FROM node:22-alpine AS build
WORKDIR /app

# Copia so os arquivos de dependencias primeiro - o Docker reaproveita essa
# camada em cache se o package.json/package-lock.json nao mudarem, entao o
# build fica bem mais rapido quando so o codigo muda.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Etapa 2: imagem final ----
# So o resultado do build (.output) + o Node pra rodar - sem node_modules
# de dev nem codigo fonte.
FROM node:22-alpine
WORKDIR /app

COPY --from=build /app/.output ./.output

ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
