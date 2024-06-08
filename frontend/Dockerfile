FROM node:20.10.0-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY ./package.json .
COPY ./pnpm-lock.yaml .
COPY ./tsconfig.json .
COPY ./tsconfig.node.json .
COPY ./.env .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm fetch
RUN pnpm install

COPY . .

EXPOSE 5173

CMD [ "pnpm","run","dev","--host"]