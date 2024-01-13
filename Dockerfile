FROM node:19.8-alpine3.16

EXPOSE 3004

RUN npm i -g pnpm
WORKDIR /libreflow-server
COPY ./package.json ./
RUN pnpm install --prod
COPY . .


CMD ["pnpm", "run", "build:production"]