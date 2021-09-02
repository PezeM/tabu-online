FROM node:14-alpine as base
WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

FROM base as production
ENV NODE_ENV=production
RUN yarn run build
