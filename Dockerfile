FROM node:14.8.0-buster AS deps
COPY package.json yarn.lock ./
RUN yarn

FROM node:14.8.0-buster AS base
WORKDIR /home/node/app
COPY --from=deps node_modules ./node_modules/

FROM base as dev
COPY . ./
CMD ["yarn", "start"]

FROM dev as compile
RUN yarn build

FROM base
COPY --from=compile /home/node/app/dist ./dist/
CMD ["node", "dist"]