FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY .next/standalone ./ 
COPY .next/static ./.next/static
COPY public ./public
COPY .env* ./
COPY next.config.js ./
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production --frozen-lockfile

EXPOSE 3006

CMD ["node", "server.js"]
