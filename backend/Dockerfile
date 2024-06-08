FROM node:20.10.0-slim

WORKDIR /app

RUN npm install -g pnpm

COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./tsconfig.json ./
COPY ./.env ./

RUN pnpm fetch
RUN pnpm install && pnpm install typescript

COPY . .

EXPOSE 8000

CMD ["node","./dist/index.js"]