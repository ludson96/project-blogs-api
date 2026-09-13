FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache openssl openssl-dev libc6-compat

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL="file:/app/dev.db"
ENV NODE_ENV="production"
ENV PORT=3000

RUN npm run build:render
RUN npx prisma db push --schema=prisma/schema.sqlite.prisma
RUN npx ts-node-dev --transpile-only prisma/seed.ts

EXPOSE 3000

CMD ["npm", "start"]