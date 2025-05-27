# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

# Etapa de produção
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3006

# Copia apenas os arquivos necessários do build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.env* ./

EXPOSE 3006

CMD ["node", "server.js"]